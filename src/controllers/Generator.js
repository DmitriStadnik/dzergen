const utils = require('../utils/utils');

const generate = (createdBy) => {
  const Dzerdan = require("../models/Dzerdan").Dzerdan;

  let name = generateName();
  let alignment = generateAlignment();  
  let rarity = setRarity(name, alignment);

  return new Dzerdan({
    name,
    nameStr: `${name[0].word}${name[1].word}`,
    image: generateImage(),
    traits: generateTraits(rarity + 1),
    alignment,
    dateCreated: Date.now(),
    owner: createdBy,
    createdBy,
    rarity,
    price: generatePrice(alignment, name, rarity),
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
    if (statSum >= 2 && statSum < 6) rarity = 0; // рядовой
    else if (statSum >= 6 && statSum < 10) rarity = 1; // бывалый
    else if (statSum >= 10 && statSum < 13) rarity = 2; // закаленный в бою
    else if (statSum >= 13 && statSum < 15) rarity = 3; // легендарный
    else rarity = 4; // эпический
  }
  return rarity
};

const setOwner = (obj, owner) => {
  obj.owner = owner;
};

const generateName = () => {
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

const generateTraits = (amount) => {
  const who = require('../arrays/build/who').content;

  let result = [];
  let which = [];
  let what = [];
  
  [...Array(amount)].map(() => {
    let g = Math.floor(Math.random() * 3);
    switch (g) {
      case 2:
        which = require('../arrays/build/whichM').content;
        what = require('../arrays/build/whatM').content;
      case 1:
        which = require('../arrays/build/whichF').content;
        what = require('../arrays/build/whatF').content;
      case 0:
        which = require('../arrays/build/whichMulti').content;
        what = require('../arrays/build/whatMulti').content;
      default:
        which = require('../arrays/build/whichM').content;
        what = require('../arrays/build/whatM').content;
    }

    result.push({
      which: which[Math.floor(Math.random() * which.length)],
      what: what[Math.floor(Math.random() * what.length)],
      who: who[Math.floor(Math.random() * who.length)]
    });
  })
  
  return result;
};

const generatePrice = (alignment, name, rarity) => {
  let mod = alignment * (name[0].value + name[1].value);
  return (Math.floor(Math.random() * 80) + 20) + (rarity * 100) + mod;
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