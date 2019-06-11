var express = require('express');
var generator = require('../src/controllers/Generator');
var Dzerdan = require("../src/models/Dzerdan").Dzerdan;
var router = express.Router();

let generatedItem = {};

router.get('/generate', function(req, res, next) {
  const creatorId = null;
  generatedItem = generator.generate(creatorId);
  res.json(generatedItem);
});

router.post('/save', function(req, res, next) {
  generatedItem.save(function (err) {
    if (err) return console.error(err);
  });
  res.json(generatedItem);
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
