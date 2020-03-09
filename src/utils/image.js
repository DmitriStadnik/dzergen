function launch () {
  const Jimp = require('jimp');

  let data = [0, 0];
  let width = [0, 0];
  let height = [0, 0];

  let targetWidth;
  let targetHeight;

  Jimp.read('./public/img/dzerdan/225.jpg', function (err, firstImage) {
    if (err) {
      throw err;
    }
  
    data[0] = new Uint8Array(firstImage.bitmap.data);
    width[0] = firstImage.bitmap.width;
    height[0] = firstImage.bitmap.height;

      
    Jimp.read('./public/img/dzerdan/155.jpg', function (err, secondImage) {
      if (err) {
        throw err;
      }
    
      data[1] = new Uint8Array(secondImage.bitmap.data);
      width[1] = secondImage.bitmap.width;
      height[1] = secondImage.bitmap.height;

      width[0] <= width[1] ? firstImage.resize(width[1], Jimp.AUTO) : secondImage.resize(width[0], Jimp.AUTO);

      targetHeight = height[0];
      targetWidth = width[0];

      let result = mergeImages(data[0], data[1], targetWidth);

      new Jimp(targetWidth, targetHeight, function (err, image) {
        if (err) {
          throw err;
        }

        image.bitmap.data = Buffer.from(result);
        image.write(`./public/img/generated/${Date.now()}.jpg`);
      });
        
    });
  });
}

const mergeImages = (first, second, width) => {
  let result = new Uint8Array(first.length); 

  let sw = true;
  let counter = 0;

  let targetLength = first.length > second.length ? first.length : second.length;

  for (let i = 3; i < targetLength; i = i + 4) {
    result[i] = sw ? first[i] : second[i];
    result[i-1] = sw ? first[i-1] : second[i-1];
    result[i-2] = sw ? first[i-2] : second[i-2];
    result[i-3] = sw ? first[i-3] : second[i-3];

    sw = !sw;
  }

  return result;
}
  
module.exports = launch;
  