const utils = require('../utils/utils');
const wordsArrays = require('../arrays/words');
const Users = require('./Users')

const generate = (createdBy) => {
  const Dzerdan = require("../models/Dzerdan").Dzerdan;

  let name = generateName();
  let alignment = generateAlignment();  
  let rarity = setRarity(name, alignment);

  return new Dzerdan({
    name,
    nameStr: `${name[0].word}${name[1].word}`,
    image: generateImage(),
    words: generateWords(),
    alignment,
    dateCreated: Date.now(),
    owner: createdBy,
    createdBy,
    rarity,
    price: generatePrice(rarity),
    alive: true,
  });
};

const setRarity = (name, alignment) => {
  let nameArrays = require('../arrays/legendary');
  let rarity = 0;

  let statSum = name[0].value + name[1].value + Math.abs(alignment);

  if (nameArrays.legendaryNames.includes(`${name[0].word}${name[1].word}`)) {
    rarity = 4; // эпический
  } else {
    if (statSum >= 2 && statSum < 7) rarity = 0; // рядовой
    else if (statSum >= 7 && statSum < 11) rarity = 1; // бывалый
    else if (statSum >= 11 && statSum < 13) rarity = 2; // закаленный в бою
    else if (statSum >= 13 && statSum < 15) rarity = 3; // легендарный
    else rarity = 4; // эпический
  }
  return rarity
};

const setOwner = (obj, owner) => {
  obj.owner = owner;
};

const generateName = () => {
  const fs = require('fs');

  const nameStart = require('../arrays/build/nameStart');
  const nameEnd = require('../arrays/build/nameEnd');

  let start = nameStart.content[Math.floor(Math.random() * nameStart.content.length)];
  let end = nameEnd.content[Math.floor(Math.random() * nameEnd.content.length)];

  if (Math.floor(Math.random() * 500) === 234) {
    end.word = start.word;
    end.value = start.value;
  }
  if (Math.floor(Math.random() * 500) === 345) {
    end.word += '-тян'
  };

  if (start.word[start.word.length - 1] === end.word[0]) end.word = end.word.substr(1, end.word.length);

  return [start, end];
};

const generateImage = () => {
  const fs = require('fs');
  const images = fs.readdirSync('././public/img/dzerdan/') || [];
  let img = utils.shuffleArray(images)
  return img[Math.floor(Math.random() * img.length)];
};

const generateWords = () => {
  const who = utils.shuffleArray(wordsArrays.who);

  let g = Math.floor(Math.random() * 2);
  switch (g) {
    case 1:
      const whichM = utils.shuffleArray(wordsArrays.whichM);
      const whatM = utils.shuffleArray(wordsArrays.whatM);
      return [
        whichM[Math.floor(Math.random() * whichM.length)],
        whatM[Math.floor(Math.random() * whatM.length)],
        who[Math.floor(Math.random() * who.length)]
      ];
    case 0:
      const whichF = utils.shuffleArray(wordsArrays.whichF);
      const whatF = utils.shuffleArray(wordsArrays.whatF);
      return [
        whichF[Math.floor(Math.random() * whichF.length)],
        whatF[Math.floor(Math.random() * whatF.length)],
        who[Math.floor(Math.random() * who.length)]
      ];
    default:
      return "well fuck " + g;
  }
};

const generatePrice = (rarity) => {
  return (Math.floor(Math.random() * 80) + 20) + (rarity * 100);
};

const generateAlignment = () => {
  return Math.floor(Math.random() * 10) - 5;
};

const die = (obj) => {
  obj.alive = false;
};

module.exports = {
  generate,
  setOwner,
  die
};