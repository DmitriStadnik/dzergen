const generateTraitsArray = () => {
    const whichM = require('../../arrays/traits').whichM;
    const whichF = require('../../arrays/traits').whichF;
    const whichMulti = require('../../arrays/traits').whichMulti;

    const whatM = require('../../arrays/traits').whatM;
    const whatF = require('../../arrays/traits').whatF;
    const whatMulti = require('../../arrays/traits').whatMulti;

    const who = require('../../arrays/traits').who;
  
    writeFile('whichM', generateWordArray(whichM));
    writeFile('whichF', generateWordArray(whichF));
    writeFile('whichMulti', generateWordArray(whichMulti));

    writeFile('whatM', generateWordArray(whatM, true));
    writeFile('whatF', generateWordArray(whatF, true));
    writeFile('whatMulti', generateWordArray(whatMulti, true));
    writeFile('who', generateWordArray(who));
  }
  
  const generateWordArray = (data, what) => {
    const utils = require('../utils');
  
    let result = [];
  
    if (what) {
      data.forEach(e => {
        result.push({
          word: e[0],
          type: e[1]
        });
      });
    } else {
      data.forEach(e => {
        [...Array(4 - e[1])].map(() => {
            result.push({
              word: e[0],
              value: e[1]
            });
        });
      });
    }

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
  
  module.exports = generateTraitsArray;