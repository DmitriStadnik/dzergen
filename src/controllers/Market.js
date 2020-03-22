const Dzerdan = require("../models/Dzerdan").Dzerdan;
const generator = require("./Generator");
const collection = require("./Collection");
const users = require("./Users");

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

const buyCard = (cardId, user, callback) => {
  const updateCard = (card) => {
    if (card === 'no currency') {
      callback({error: 'no currency'})
    } else {
      generator.setOwner(card, user, callback);
    }
    
  }
  
  const removeCurrency = (err, card) => {
    if (err) return console.error(err);
    users.removeCurrency(user, card, updateCard)
  }

  Dzerdan.findById(cardId, removeCurrency);
};

module.exports = {
  generateMarket,
  buyCard
};