const Dzerdan = require("../models/Dzerdan").Dzerdan;
const ObjectID = require('mongodb').ObjectID;

const composeQuery = (rarityParam, nameParam, aliveParam, ownerParam, noOwner) => {
  const query = Dzerdan.find();

  if (rarityParam !== null) {
    query
      .where('rarity')
      .eq(rarityParam);
  }
  if (aliveParam) {
    query
      .where('alive')
      .eq(aliveParam);
  }
  if (nameParam) {
    query
      .where({"nameStr": { "$regex": nameParam.toLowerCase(), "$options": "i" }});
  }
  if (noOwner) {
    query
      .where("owner").equals([]);
  } else {
    if (ownerParam) {
      query
        .where({"owner": new ObjectID(ownerParam)})
    } 
  }
  
  return query.populate('owner').populate('createdBy').sort('-dateCreated');
};

const countItems = (rarityParam, nameParam, aliveParam, ownerParam, callback, noOwner = null) => {
  if (callback) {
    const query = composeQuery(rarityParam, nameParam, aliveParam, ownerParam, noOwner);
    query
      .countDocuments()
      .exec((err, count) => {
        if (err) return console.error(err);
        callback(true, count)
      });
  } 
};

const getItems = (rarityParam, nameParam, aliveParam, ownerParam, page, count, callback, noOwner = null) => {
  if (callback) {
    const query = composeQuery(rarityParam, nameParam, aliveParam, ownerParam, noOwner);
    query
      .skip(page * count)
      .limit(count)
      .exec((err, items) => {
        if (err) return console.error(err);
        callback(false, items)
      });
  } 
};

module.exports = {
  countItems,
  getItems,
};