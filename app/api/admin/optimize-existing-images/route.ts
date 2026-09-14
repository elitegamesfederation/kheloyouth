import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

import { adminAuth, adminDb, adminStorage } from "@/app/lib/firebase-admin";

export const runtime = "nodejs";
export const maxDuration = 60;

const ADMIN_EMAIL = "jameelhawati@gmail.com";
const BATCH_SIZE = 10;
const SKIP_UNDER_BYTES = 60 * 1024;

type ResizeProfile = {
  width: number;
  height: number;
  quality: number;
  forceJpeg: boolean;
};

const getResizeProfile = (path: string): ResizeProfile => {
  const folderSegment = path.split("/")[2] || "";

  if (folderSegment === "logo" || path.includes("academy-logos")) {
    return { width: 800, height: 800, quality: 85, forceJpeg: false };
  }

  if (folderSegment === "academy-photos" || path.includes("academy-photos")) {
    return { width: 1600, height: 1600, quality: 82, forceJpeg: true };
  }

  // owners / coaches / students headshots
  return { width: 520, height: 680, quality: 78, forceJpeg: true };
};

const parseStorageUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes("firebasestorage.googleapis.com")) {
      return null;
    }

    const match = parsed.pathname.match(/\/v0\/b\/([^/]+)\/o\/([^/]+)/);

    if (!match) return null;

    return {
      bucket: match[1],
      path: decodeURIComponent(match[2]),
      token: parsed.searchParams.get("token") || "",
    };
  } catch {
    return null;
  }
};

const collectImageUrls = (data: any): string[] => {
  const urls: string[] = [];

  if (data.academyLogoUrl) urls.push(data.academyLogoUrl);
  if (data.logoURL) urls.push(data.logoURL);
  if (Array.isArray(data.academyImageUrls)) urls.push(...data.academyImageUrls);

  for (const key of ["owners", "coaches", "students"]) {
    const people = Array.isArray(data[key]) ? data[key] : [];

    for (const person of people) {
      if (person?.photoUrl) urls.push(person.photoUrl);
    }
  }

  return Array.from(new Set(urls.filter((url) => typeof url === "string")));
};

const optimizeOne = async (url: string, log: string[]) => {
  const parsed = parseStorageUrl(url);

  if (!parsed) {
    log.push(`skip (not a storage url)`);
    return { changed: false, before: 0, after: 0 };
  }

  const file = adminStorage.bucket(parsed.bucket).file(parsed.path);
  const [exists] = await file.exists();

  if (!exists) {
    log.push(`skip (missing): ${parsed.path}`);
    return { changed: false, before: 0, after: 0 };
  }

  const [buffer] = await file.download();
  const originalBytes = buffer.length;

  if (originalBytes < SKIP_UNDER_BYTES) {
    log.push(
      `skip (already ${(originalBytes / 1024).toFixed(1)}KB): ${parsed.path}`
    );
    return { changed: false, before: originalBytes, after: originalBytes };
  }

  const [metadata] = await file.getMetadata();
  const isPng = metadata.contentType === "image/png";
  const profile = getResizeProfile(parsed.path);
  const outputIsPng = isPng && !profile.forceJpeg;

  let pipeline = sharp(buffer).resize({
    width: profile.width,
    height: profile.height,
    fit: "inside",
    withoutEnlargement: true,
  });

  pipeline = outputIsPng
    ? pipeline.png({ quality: profile.quality })
    : pipeline.jpeg({ quality: profile.quality });

  const outputBuffer = await pipeline.toBuffer();

  if (outputBuffer.length >= originalBytes) {
    log.push(`skip (no gain): ${parsed.path}`);
    return { changed: false, before: originalBytes, after: originalBytes };
  }

  const existingToken =
    parsed.token ||
    (metadata.metadata as any)?.firebaseStorageDownloadTokens ||
    "";

  await file.save(outputBuffer, {
    contentType: outputIsPng ? "image/png" : "image/jpeg",
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: existingToken,
      },
    },
  });

  log.push(
    `optimized ${parsed.path}: ${(originalBytes / 1024).toFixed(1)}KB -> ${(
      outputBuffer.length / 1024
    ).toFixed(1)}KB`
  );

  return { changed: true, before: originalBytes, after: outputBuffer.length };
};

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const idToken = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : "";

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing admin session token" },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const { offset = 0 } = await request.json().catch(() => ({ offset: 0 }));

    const snap = await adminDb.collection("academies").get();
    const allUrls: string[] = [];

    snap.docs.forEach((doc) => {
      allUrls.push(...collectImageUrls(doc.data()));
    });

    const uniqueUrls = Array.from(new Set(allUrls));
    const batch = uniqueUrls.slice(offset, offset + BATCH_SIZE);

    const log: string[] = [];
    let changedCount = 0;
    let totalBefore = 0;
    let totalAfter = 0;

    for (const url of batch) {
      const result = await optimizeOne(url, log);

      if (result.changed) {
        changedCount += 1;
      }

      totalBefore += result.before;
      totalAfter += result.after;
    }

    const nextOffset = offset + batch.length;

    return NextResponse.json({
      totalUrls: uniqueUrls.length,
      processedInBatch: batch.length,
      nextOffset,
      done: nextOffset >= uniqueUrls.length,
      changedCount,
      totalBeforeKB: Math.round(totalBefore / 1024),
      totalAfterKB: Math.round(totalAfter / 1024),
      log,
    });
  } catch (error: any) {
    console.error("optimize-existing-images failed", error);

    return NextResponse.json(
      { error: error?.message || "Optimization failed" },
      { status: 500 }
    );
  }
}
