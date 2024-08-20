document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const img = new Image();
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });
  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;
    originalCtx.drawImage(img, 0, 0);
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // 5x5 ガウシアンフィルタの実装
    const outputData = new Uint8ClampedArray(imageData.data.length);
    const width = img.width;
    const height = img.height;

    // 5x5 ガウシアンカーネル
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kernelSum = 256; // カーネルの合計

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = -2; ky <= 2; ky++) {
          for (let kx = -2; kx <= 2; kx++) {
            const px = Math.min(width - 1, Math.max(0, x + kx));
            const py = Math.min(height - 1, Math.max(0, y + ky));
            const i = (py * width + px) * 4;
            const weight = kernel[ky + 2][kx + 2];

            r += data[i] * weight;
            g += data[i + 1] * weight;
            b += data[i + 2] * weight;
          }
        }

        const i = (y * width + x) * 4;
        outputData[i] = r / kernelSum;
        outputData[i + 1] = g / kernelSum;
        outputData[i + 2] = b / kernelSum;
        outputData[i + 3] = data[i + 3]; // アルファチャンネルはそのまま
      }
    }

    const outputImageData = new ImageData(outputData, width, height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });
  reader.readAsDataURL(file);
});
