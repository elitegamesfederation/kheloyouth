import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const ALLOWED_IMAGE_HOSTS = new Set([
  "firebasestorage.googleapis.com",
  "storage.googleapis.com",
]);

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return new NextResponse("Missing image URL", { status: 400 });
  }

  let imageUrl: URL;

  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return new NextResponse("Invalid image URL", { status: 400 });
  }

  if (!ALLOWED_IMAGE_HOSTS.has(imageUrl.hostname)) {
    return new NextResponse("Image host not allowed", { status: 400 });
  }

  const imageResponse = await fetch(imageUrl.toString(), {
    cache: "no-store",
  });

  if (!imageResponse.ok || !imageResponse.body) {
    return new NextResponse("Image could not be loaded", {
      status: imageResponse.status || 502,
    });
  }

  const headers = new Headers();
  headers.set(
    "Content-Type",
    imageResponse.headers.get("content-type") || "image/jpeg"
  );
  headers.set("Cache-Control", "public, max-age=3600");

  return new NextResponse(imageResponse.body, {
    status: 200,
    headers,
  });
}
