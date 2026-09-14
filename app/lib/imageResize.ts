type ResizeOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
};

// Downscales an image File in the browser before upload, so Firebase
// Storage never has to hold (and Vercel's image optimizer never has to
// fetch) full-resolution camera photos for content that's only ever
// displayed as a thumbnail or banner.
export const resizeImageFile = (
  file: File,
  { maxWidth = 1600, maxHeight = 1600, quality = 0.82, mimeType }: ResizeOptions = {}
): Promise<File> =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const outputType =
      mimeType || (file.type === "image/png" ? "image/png" : "image/jpeg");
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const scale = Math.min(
          maxWidth / image.width,
          maxHeight / image.height,
          1
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          resolve(file);
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            const extension = outputType === "image/png" ? "png" : "jpg";
            const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";

            resolve(
              new File([blob], `${baseName}.${extension}`, {
                type: outputType,
              })
            );
          },
          outputType,
          quality
        );
      };

      image.onerror = () => resolve(file);
      image.src = String(reader.result || "");
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
