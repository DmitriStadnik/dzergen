const utils = require('../utils/utils');
const nameArrays = require('../arrays/name');
const wordsArrays = require('../arrays/words');

const generate = (createdBy) => {
  const ObjectID = require('mongodb').ObjectID;
  console.log('generate')
  let result = {
    name: generateName(),
    image: generateImage(),
    words: generateWords(),
    stats: generateStats(),
    dateCreated: Date.now(),
    owner: null,
    createdBy,
    rarity: 0,
    alive: true,
    id: new ObjectID(),
  }
  console.log(result)
  return result
}
// СКОРЕЕ ВСЕГО ПРОБЛЕМА ТУТ
const setRarity = (obj) => {
  if (nameArrays.legendaryNames.includes(obj.name[0] + obj.name[1])) {
    obj.rarity = 4; // эпический
    return;
  }
  const stats = obj.stats;
  let statSum = 0;

  Object.keys(stats).forEach(e => statSum += stats[e]);

  if (statSum >= 0 && statSum < 10) obj.rarity = 0; // рядовой
  if (statSum >= 10 && statSum < 20) obj.rarity = 1; // бывалый
  if (statSum >= 20 && statSum < 30) obj.rarity = 2; // закаленный в бою
  if (statSum >= 30 && statSum < 40) obj.rarity = 3; // легендарный
  if (statSum == 40) obj.rarity = 4; // эпический
}

const setOwner = (obj, owner) => {
  obj.owner = owner;
}

const generateName = () => {
  const startArr = utils.shuffleArray(nameArrays.start);
  const endArr = utils.shuffleArray(nameArrays.end);

  let start = startArr[Math.floor(Math.random() * nameArrays.start.length)];
  let end = endArr[Math.floor(Math.random() * nameArrays.end.length)];

  if (Math.floor(Math.random() * 500) == 234) end = startж
  if (Math.floor(Math.random() * 500) == 345) end += '-тян';
  if (start[start.length - 1] == end[0]) end = end.substr(1, end.length);

  return [start, end];
}

const generateImage = () => {
  const fs = require('fs');
  const images = fs.readdirSync('././public/img/dzerdan/') || [];
  let img = utils.shuffleArray(images)
  return img[Math.floor(Math.random() * img.length)];
}

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
      ]
    case 0:
      const whichF = utils.shuffleArray(wordsArrays.whichF);
      const whatF = utils.shuffleArray(wordsArrays.whatF);
      return [
        whichF[Math.floor(Math.random() * whichF.length)],
        whatF[Math.floor(Math.random() * whatF.length)],
        who[Math.floor(Math.random() * who.length)]
      ]
    default:
      return "well fuck " + g;
  }
}

const generateStats = () => {
  let vitality = 0;
  let strength = 0;
  let arse = 0;
  let intellect = 0;

  vitality = Math.floor(Math.random() * 10) + 1;
  strength = Math.floor(Math.random() * 10) + 1;
  arse = Math.floor(Math.random() * 10) + 1;
  intellect = Math.floor(Math.random() * 10) + 1;

  return {
    vitality,
    strength,
    arse,
    intellect
  };
}

const die = (obj) => {
  obj.alive = false;
}

module.exports = {
  generate,
  setRarity,
  setOwner,
  die,
};