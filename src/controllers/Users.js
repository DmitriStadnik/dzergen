const User = require("../models/User").User;
const bcrypt = require('bcryptjs');

const processNewUser = (name, email, password, callback) => {
  if (!name || name.length <= 0) {
    callback && callback( {
      error: 'Name invalid'
    })
  }
  if (!email || email.length <= 0) {
    callback && callback( {
      error: 'Email invalid'
    })
  }
  if (!password || password.length <= 0) {
    callback && callback( {
      error: 'password invalid'
    })
  }

  let user = new User({
    name,
    email,
    password,
    image: null
  });

  const hashPassword = (error) => {
    if (error.length > 0) {
      callback && callback({
        error: error
      });
      return;
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        user.password = hash;

        callback && callback(user);
      })
    });
  };

  ifUserExists(name, email, hashPassword);
};

const ifUserExists = (name, email, callback) => {
  User.find()
    .or([{ name: name }, { email: email }])
    .exec((err, items) => {
      if (err) return console.error(err);
      if (items.length > 0) {
        callback && callback('user exists');
      } else {
        callback && callback('');
      }
    });
};

module.exports = {
  processNewUser,
};