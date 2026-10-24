import rawProducts from "@/public/shop/products.json";

export type ShopProduct = {
  id: string;
  lookNumber: number;
  title: string;
  description: string;
  category: string;
  priceLabel: string;
  creatorImage: string;
  productImage: string;
  affiliateUrl: string;
  isAiImage: boolean;
  active: boolean;
  addedOn: string;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// products.json is edited by hand, so every entry is checked rather than
// trusted: a missing field or a placeholder link must never reach the page
// as a broken card. The Amazon link has to be https for the same reason.
function parseProduct(value: unknown): ShopProduct | null {
  if (typeof value !== "object" || value === null) return null;

  const {
    id,
    lookNumber,
    title,
    description,
    category,
    priceLabel,
    creatorImage,
    productImage,
    affiliateUrl,
    isAiImage,
    active,
    addedOn,
  } = value as Record<string, unknown>;

  if (
    !isNonEmptyString(id) ||
    typeof lookNumber !== "number" ||
    !Number.isInteger(lookNumber) ||
    lookNumber < 1 ||
    !isNonEmptyString(title) ||
    !isNonEmptyString(description) ||
    !isNonEmptyString(category) ||
    !isNonEmptyString(priceLabel) ||
    !isNonEmptyString(creatorImage) ||
    !isNonEmptyString(productImage) ||
    !isNonEmptyString(affiliateUrl) ||
    !affiliateUrl.startsWith("https://")
  ) {
    return null;
  }

  return {
    id,
    lookNumber,
    title,
    description,
    category,
    priceLabel,
    creatorImage,
    productImage,
    affiliateUrl,
    isAiImage: isAiImage === true,
    active: active === true,
    addedOn: typeof addedOn === "string" ? addedOn : "",
  };
}

const addedTime = (product: ShopProduct) => {
  const time = Date.parse(product.addedOn);
  return Number.isNaN(time) ? 0 : time;
};

// Active products only, newest first. Same-day additions fall back to the
// higher look number first so a batch added together reads newest-to-oldest.
export function getShopProducts(): ShopProduct[] {
  const entries: unknown[] = Array.isArray(rawProducts) ? rawProducts : [];
  const products: ShopProduct[] = [];

  for (const entry of entries) {
    const product = parseProduct(entry);

    if (product) {
      if (product.active) products.push(product);
      continue;
    }

    const marked = (entry ?? {}) as { id?: unknown; active?: unknown };
    if (marked.active === true) {
      console.warn(
        `[shop] Skipping "${String(marked.id)}" in public/shop/products.json: a required field is missing, or the Amazon link does not start with https://`
      );
    }
  }

  return products.sort(
    (a, b) => addedTime(b) - addedTime(a) || b.lookNumber - a.lookNumber
  );
}

export function getShopCategories(products: ShopProduct[]): string[] {
  return Array.from(new Set(products.map((product) => product.category)));
}
