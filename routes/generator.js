const express = require('express');
const generator = require('../src/controllers/Generator');
const Dzerdan = require("../src/models/Dzerdan").Dzerdan;
const router = express.Router();

router.get('/generate', function(req, res, next) {
  const generatedItem = generator.generate(req.query.userId);
  res.json(generatedItem);
});

router.post('/save', function(req, res, next) {
  let item = new Dzerdan({
    ...req.body
  });
  item.save(function (err) {
    if (err) return console.error(err);
  });
  res.json(item);
});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
