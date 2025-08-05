const inquirer = require('inquirer');
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

const startApp = async () => {
  const answer = await inquirer.prompt([
    {
      name: 'start',
      message:
        'Hi! Welcome to "Watermark manager". Copy you image files to `/img` folder. Then you\'ll be able to use them in the app. Are you ready?',
      type: 'confirm',
    },
  ]);

  if (!answer.start) {
    process.exit();
  }

  const options = await inquirer.prompt([
    {
      name: 'inputImage',
      type: 'input',
      message: 'What file do you want to mark?',
      default: 'test.jpg',
    },
    {
      name: 'watermarkType',
      type: 'list',
      choices: ['Text watermark', 'Image watermark'],
    },
  ]);

  console.log('options: ', options);

  if (options.watermarkType === 'Text watermark') {
    const text = await inquirer.prompt([
      {
        name: 'value',
        type: 'input',
        message: 'Type you watermark text:',
      },
    ]);
    options.watermarkText = text.value;
    addTextWatermarkToImage(
      './img/' + options.inputImage,
      './test-with-watermark.jpg',
      options.watermarkText
    );
  } else {
    // TODO: write this part
  }
};

startApp();
