const User = require("../models/User").User;

const findUserById = (id, callback) => {
  User.findOne()
    .where({ _id: id })
    .select('-password')
    .exec((err, item) => {
      if (err) return console.error(err);
      if (item) {
        callback && callback(item);
      } else {
        callback && callback('user not found in db');
      }
    });
}

const removeCurrency = (id, card, callback) => {
  User.findById(id).exec((err, item) => {
    if (err) return console.error(err);
    
    if (item.currency.coin - card.price >= 0) {
      item.currency.coin -= card.price;
      item.save();
      callback && callback(card);
    } else {
      callback && callback('no currency');
    }
  });
}

module.exports = {
  findUserById,
  removeCurrency
};