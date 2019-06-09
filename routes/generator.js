var express = require('express');
var generator = require('../src/modules/Generator');
var router = express.Router();

const generatedItem = {};

router.get('/generate', function(req, res, next) {
  const creatorId = '1';
  generatedItem = generator.generate(creatorId);
  generator.setRarity(generatedItem);

  res.json(generatedItem);
});

module.exports = router;
