const Jimp = require('jimp');

const addTextWatermarkToImage = async function (inputFile, outputFile, text) {
  const image = await Jimp.read(inputFile);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const textData = {
    text,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
  };

  image.print(font, 0, 0, textData, image.getWidth(), image.getHeight());
  await image.quality(100).writeAsync(outputFile);
};

// addTextWatermarkToImage(
//   './test.jpg',
//   './test-with-watermark.jpg',
//   'Hello World'
// );

const addImageWatermarkToImage = async function (
  inputFile,
  outputFile,
  watermarkFile
) {
  const image = await Jimp.read(inputFile);
  const watermark = await Jimp.read(watermarkFile);

  const x = image.getWidth() / 2 - watermark.getWidth() / 2;
  const y = image.getHeight() / 2 - watermark.getHeight() / 2;

  image.composite(watermark, x, y, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5,
  });

  await image.quality(100).writeAsync(outputFile);
};

// addImageWatermarkToImage(
//   './test.jpg',
//   './test-with-watermark2.jpg',
//   './logo.png'
// );

process.stdout.write('Type "E" to exit, typ "H" to say hello ');
process.stdin.on('readable', () => {
  const input = process.stdin.read();

  const instruction = input.toString().trim();

  if (instruction === 'E') {
    process.stdout.write('Exiting app...');
    process.exit();
  } else if (instruction === 'H') {
    process.stdout.write('Hi! How are you?');
  } else {
    process.stdout.write('Wrong instruction!\n');
  }
});
