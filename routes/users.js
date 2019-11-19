const express = require('express');
const passport = require('passport');
const users = require("../src/controllers/Users");
const User = require("../src/models/User").User;
const router = express.Router();

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

router.post('/register', function(req, res, next) {
  passport.authenticate('register', (err, user, info) => {
    console.log(user)
    if (err) {
      res.json(err);
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.json(info.message);
    } else {
      bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: hashedPassword,
          image: null
        })
        newUser.save(function (error) {
          if (error) return console.error(error);
          res.json(newUser)
        });
      });
    }
  })(req, res, next);
});

// TODO passport.js
// router.post('/login', function(req, res, next) {
//   const email = req.body.email || null;
//   const password = req.body.password || null;

//   function sendResponse (item) {
//     if (item.error) {
//       res.json(item);
//       return;
//     }
//     item.save(function (err) {
//       if (err) return console.error(err);
//     });
//     res.json(item);
//   }

//   users.login(email, password, sendResponse);
// });

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
