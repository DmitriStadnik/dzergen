const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const users = require("../src/controllers/Users");
const User = require("../src/models/User").User;
const router = express.Router();

const jwtSecret = process.env.SESSION_SECRET;

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;


// user registration route
router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) res.json(err);
    if (info !== undefined) {
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
          if (error) return res.json(newUser);
          res.json(newUser);
        });
      });
    }
  })(req, res, next);
});

// user login route
router.post('/auth/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) res.json(err);
    if (info !== undefined) {
      res.json(info.message);
    } else {
      req.logIn(user, err => {
        User.findOne()
          .or([{ name: req.body.name }, { email: req.body.email }])
          .exec((err, item) => {
            if (err) res.json(err);
            if (item) {
              const token = jwt.sign({ id: item.email }, jwtSecret);
              res.json({
                auth: true,
                token: token,
                user: item
              });
            } else {
              res.json({
                auth: false,
              });
            }
          })
      })
    }
  })(req, res, next);
});

// user auth check route
router.get('/auth/check', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) res.json(err);
    if (info !== undefined) {
      res.json(info.message);
    } else {
      res.json({
        auth: true,
        userId: user._id
      });
    }
  })(req, res, next);
});

router.get('/user/get', (req, res, next) => {
  if (!req.query.id || req.query.id.length <= 0) {
    res.json({
      error: 'no id'
    })
  }
  users.findUserById(req.query.id, (data) => {
    res.json(data);
  });
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
