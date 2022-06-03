export const getCroppedImage = async (image, crop, filename) => {
    console.log('image', image)
    console.log('crop', crop)
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
    );

    // Converting to base64
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          // returning an error
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
  
          blob.name = filename;
          // creating a Object URL representing the Blob object given
          const croppedImageUrl = window.URL.createObjectURL(blob);
  
          resolve(croppedImageUrl);
        }, "image/jpeg");
      });
}
