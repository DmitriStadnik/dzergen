const express = require('express');
const users = require("../src/controllers/Users");
const router = express.Router();

router.post('/register', function(req, res, next) {
  const name = req.body.name || null;
  const email = req.body.email || null;
  const password = req.body.password || null;

  function sendResponse (item) {
    if (item.error) {
      res.json(item);
      return;
    }
    item.save(function (err) {
      if (err) return console.error(err);
    });
    res.json(item);
  }

  users.processNewUser(name, email, password, sendResponse);
});

router.post('/login', function(req, res, next) {
  const email = req.body.email || null;
  const password = req.body.password || null;

  function sendResponse (item) {
    if (item.error) {
      res.json(item);
      return;
    }
    item.save(function (err) {
      if (err) return console.error(err);
    });
    res.json(item);
  }

  users.login(email, password, sendResponse);
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
