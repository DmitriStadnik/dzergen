const Dzerdan = require("../models/Dzerdan").Dzerdan;
const generator = require("./Generator");
const collection = require("./Collection");

const generateMarket = () => {
  checkMarket((flag, count) => {
    if (count < 20) {
      console.log('market generation started');
      let items = [];
      [...Array(20)].map(() => {
        items.push(generator.generate());
      });
      Dzerdan.insertMany(items, (err) => {
        if (err) return console.error(err);
      })
    } else {
      console.log('market generation not needed');
    }
  })
};

const checkMarket = (callback) => {
  callback && collection.countItems(null, null, null, null, callback, true);
};

module.exports = {
  generateMarket,
};