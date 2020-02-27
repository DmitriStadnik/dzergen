const User = require("../models/User").User;
const bcrypt = require('bcryptjs');

const findUserById = (id, callback) => {
  User.findOne()
    // .or([{ name: name }, { email: email }])
    .where({ _id: id })
    .select('-password')
    .exec((err, item) => {
      if (item) {
        console.log('user found in db in passport');
        // note the return removed with passport JWT - add this return for passport local
        callback && callback(item);
      } else {
        console.log('user not found in db');
        callback && callback('user not found in db');
      }
    });
}

module.exports = {
  findUserById,
};