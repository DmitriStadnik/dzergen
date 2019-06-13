var Dzerdan = require("../models/Dzerdan").Dzerdan;

const composeQuery = (rarityParam, nameParam, aliveParam) => {
  const query = Dzerdan.find().sort('-dateCreated')

  if (rarityParam) query.where('rarity').gte(rarityParam);
  if (aliveParam) query.where('alive').eq(aliveParam);
  if (nameParam) query.$where("(this.name[0] + this.name[1]).toLowerCase().indexOf('" + nameParam.toLowerCase() + "') !== -1");

  return query;
}

const countItems = (rarityParam, nameParam, aliveParam, callback) => {
  if (callback) {
    const query = composeQuery(rarityParam, nameParam, aliveParam);
    query
      .countDocuments()
      .exec((err, count) => {
        if (err) return console.error(err);
        callback(true, count)
      });
  } 
}

const getItems = (rarityParam, nameParam, aliveParam, page, count, callback) => {
  if (callback) {
    const query = composeQuery(rarityParam, nameParam, aliveParam);
    query
      .skip(page * count)
      .limit(count)
      .exec((err, items) => {
        if (err) return console.error(err);
        callback(false, items)
      });
  } 
}

module.exports = {
  composeQuery,
  countItems,
  getItems,
};