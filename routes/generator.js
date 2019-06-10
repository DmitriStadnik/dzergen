var express = require('express');
var generator = require('../src/modules/Generator');
var router = express.Router();

let generatedItem = {};

router.get('/generate', function(req, res, next) {
  const creatorId = '1';
  generatedItem = generator.generate(creatorId);
  generatedItem.rarity = generator.setRarity(generatedItem.name, generatedItem.stats);
  console.log('generate')
  console.log(generatedItem);
  res.json(generatedItem);
});

module.exports = router;
