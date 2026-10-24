# Shop images

Every look on the `/shop` page uses **two** images that live in this folder.

## Naming

Use the look's 3-digit number from `products.json` (`look-001` is look number 1, `look-012` is look number 12):

| Image | File name | Shown as |
| --- | --- | --- |
| Meera wearing the look | `look-001-meera.jpg` | The large main image on the card |
| The actual product | `look-001-product.jpg` | The small "Actual product" thumbnail |

The file names must match the `creatorImage` and `productImage` paths in `public/shop/products.json` exactly (they are case-sensitive on the live site).

If a file is missing, the card shows a "Photo coming soon" tile instead of a broken image, so it is safe to add a product before its photos are ready, but the photos should be added before the look is promoted on Instagram.

## Recommended size

- **Shape:** 4:5 portrait (the same shape Instagram uses). Example: 1080 x 1350 px.
- **Width:** at most 1080 px. Anything larger is wasted; the site resizes images for each device.
- **Format:** WebP or JPG. WebP is smaller; JPG is fine.
- **File size:** under 200 KB each. Free tools such as Squoosh (squoosh.app) can shrink a photo to this size without visible loss.

If you use WebP, use the `.webp` extension in the file name **and** in `products.json`.

## Good to know

- Everything in the `public` folder can be opened by anyone with the link. Only upload images you are happy to publish.
- Images generated with AI must be marked `"isAiImage": true` in `products.json` so the card shows the "AI-styled look" label.
- The product photo should be the real product as listed on Amazon, not an AI image.
