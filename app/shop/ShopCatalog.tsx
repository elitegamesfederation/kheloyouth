"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { trackShopClick } from "@/app/lib/shopAnalytics";
import type { ShopProduct } from "@/app/lib/shopProducts";

const ALL_CATEGORIES = "All";
const HIGHLIGHT_MS = 2800;

// Glow around a card that was just linked to (/shop#look-N): held for most of
// the duration, then faded out. Drawn with the Web Animations API so there is
// nothing to clean up afterwards - the card returns to its normal style when
// it finishes.
const HIGHLIGHT_GLOW = "0 0 0 3px rgb(249,115,22), 0 0 50px rgba(255,115,0,0.55)";
const HIGHLIGHT_KEYFRAMES: Keyframe[] = [
  { boxShadow: HIGHLIGHT_GLOW, offset: 0 },
  { boxShadow: HIGHLIGHT_GLOW, offset: 0.75 },
  {
    boxShadow: "0 0 0 3px rgba(249,115,22,0), 0 0 50px rgba(255,115,0,0)",
    offset: 1,
  },
];

// The URL hash is an external value, so it is read with useSyncExternalStore
// (null on the server, the real hash once the page is in the browser).
function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHashLookNumber(): number | null {
  const match = /^#look-(\d+)$/.exec(window.location.hash);
  return match ? Number(match[1]) : null;
}

const getServerHashLookNumber = () => null;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

// Falls back to a tile instead of a broken-image icon when a photo has not
// been uploaded yet (or fails to load). next/image re-fires onError for
// images that failed before hydration, so this also covers server-rendered
// 404s.
function ShopImage({
  src,
  alt,
  sizes,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  sizes: string;
  fallbackLabel: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-zinc-800 p-2 text-center text-xs font-semibold text-gray-300">
        {fallbackLabel}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={1350}
      sizes={sizes}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <article
      id={`look-${product.lookNumber}`}
      className="flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
    >
      <div className="relative aspect-[4/5] w-full bg-zinc-800">
        <ShopImage
          src={product.creatorImage}
          alt={`${product.title} - Meera's styled look`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          fallbackLabel="Photo coming soon"
        />

        {product.isAiImage && (
          <span className="absolute left-2 top-2 rounded-full bg-black/85 px-2.5 py-1 text-[11px] font-bold leading-none text-white">
            AI-styled look
          </span>
        )}

        <div className="absolute bottom-2 right-2 w-[34%] overflow-hidden rounded-xl border-2 border-white bg-black shadow-lg">
          <div className="relative aspect-[4/5] w-full">
            <ShopImage
              src={product.productImage}
              alt={`${product.title} - actual product`}
              sizes="(min-width: 768px) 12vw, 18vw"
              fallbackLabel="Soon"
            />
          </div>
          <p className="px-1 py-1 text-center text-[10px] font-semibold leading-tight text-white">
            Actual product
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
          Look #{product.lookNumber}
        </p>

        <h2 className="mt-2 text-base font-black leading-snug md:text-lg">
          {product.title}
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-gray-300">
          {product.description}
        </p>

        <p className="mt-3 text-lg font-black">{product.priceLabel}</p>
        <p className="text-xs text-gray-400">
          Check Amazon for the current price.
        </p>

        <div className="mt-auto pt-4">
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            onClick={() => trackShopClick(product.id)}
            aria-label={`Buy on Amazon: ${product.title} (opens in a new tab)`}
            className={`flex w-full items-center justify-center gap-1 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-black transition hover:bg-orange-400 ${focusRing}`}
          >
            Buy on Amazon <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ShopCatalog({
  products,
  categories,
}: {
  products: ShopProduct[];
  categories: string[];
}) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [handledLook, setHandledLook] = useState<number | null>(null);

  const hashLook = useSyncExternalStore(
    subscribeToHash,
    getHashLookNumber,
    getServerHashLookNumber
  );
  const targetLook =
    hashLook !== null && products.some((product) => product.lookNumber === hashLook)
      ? hashLook
      : null;

  // Instagram captions link to /shop#look-N. When the link changes, clear
  // the category filter in the same render so the card can never be hidden
  // behind a chip the visitor had selected.
  if (targetLook !== handledLook) {
    setHandledLook(targetLook);
    if (targetLook !== null) setCategory(ALL_CATEGORIES);
  }

  const visibleProducts = useMemo(
    () =>
      category === ALL_CATEGORIES
        ? products
        : products.filter((product) => product.category === category),
    [products, category]
  );

  // Runs after that render is on the page, so the card exists.
  useEffect(() => {
    if (targetLook === null) return;

    const card = document.getElementById(`look-${targetLook}`);
    if (!card) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    card.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
    card.animate?.(HIGHLIGHT_KEYFRAMES, {
      duration: HIGHLIGHT_MS,
      easing: "ease-out",
    });
  }, [targetLook]);

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center text-gray-300">
        New looks are on the way. Follow @elite.meera on Instagram to see them
        first.
      </p>
    );
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Filter looks by category"
        className="flex flex-wrap gap-3"
      >
        {[ALL_CATEGORIES, ...categories].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setCategory(name)}
            aria-pressed={category === name}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${focusRing} ${
              category === name
                ? "border-orange-500 bg-orange-500 text-black"
                : "border-white/20 text-gray-200 hover:border-orange-500 hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-gray-400">
        Showing {visibleProducts.length}{" "}
        {visibleProducts.length === 1 ? "look" : "looks"}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
