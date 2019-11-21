const User = require("../models/User").User;
const bcrypt = require('bcryptjs');

// const processNewUser = (name, email, password, callback) => {
//   if (!name || name.length <= 0) {
//     callback && callback( {
//       error: 'Name invalid'
//     })
//   }
//   if (!email || email.length <= 0) {
//     callback && callback( {
//       error: 'Email invalid'
//     })
//   }
//   if (!password || password.length <= 0) {
//     callback && callback( {
//       error: 'Password invalid'
//     })
//   }
// };

// const ifUserExists = (name, email, callback) => {
//   User.find()
//     .or([{ name: name }, { email: email }])
//     .exec((err, items) => {
//       if (err) return console.error(err);
//       if (items.length > 0) {
//         callback && callback('user exists');
//       } else {
//         callback && callback('');
//       }
//     });
// };

const findUserById = (id, callback) => {
  User.findOne()
    // .or([{ name: name }, { email: email }])
    .where({ _id: id })
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