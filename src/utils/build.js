const generateNamesArray = () => {
  const start = require('../arrays/name').start;
  const end = require('../arrays/name').end;

  writeFile('nameStart', generateWordArray(start));
  writeFile('nameEnd', generateWordArray(end));
}

const generateWordArray = (data) => {
  const utils = require('./utils');

  let result = [];

  data.forEach(e => {
    [...Array(6 - e[1])].map(() => {
      result.push({
        word: e[0],
        value: e[1]
      });
    });
  });

  return utils.shuffleArray(result);
}

const writeFile = (fileName, fileContent) => {
  const fs = require('fs');

  console.log(`Generating ${fileName}.js`);

  fs.writeFile(`./src/arrays/build/${fileName}.js`, `module.exports = { \n"content": [`, (err) => {
    if (err) throw err;
    console.log(`${fileName}.js generation has started`);

    let counter = 0;

    fileContent.forEach((e, index) => {
      fs.appendFile(`./src/arrays/build/${fileName}.js`, `\n${JSON.stringify(e)},`, (err) => {
        if (err) throw err;

        counter++;
        if (counter === fileContent.length) {
          fs.appendFile(`./src/arrays/build/${fileName}.js`, `\n]}`, (err) => {
            if (err) throw err;
            console.log(`${fileName}.js generation has finished`);
          });
        }
      });
    });
  });
}

function launch () {
  generateNamesArray();
}

module.exports = launch;
