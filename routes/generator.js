var express = require('express');
var generator = require('../src/modules/Generator');
var router = express.Router();
const db = require('../src/utils/db');

let generatedItem = {};



router.get('/generate', function(req, res, next) {
  const creatorId = '1';
  generatedItem = generator.generate(creatorId);
  res.json(generatedItem);
});

router.get('/list', function(req, res, next) {
  let database = db.get();
  let collection = database.collection('generated-items');
  collection.find({}).toArray()
	.then((dzerdans) => {
    console.log(dzerdans);
  });
});

router.post('/save', function(req, res, next) {
  db.get().collection('dzerdan').insertOne(generatedItem, (err, r) => {
    if (err) response.send("An error occured", err)
    else response.send('OK');
  })

});

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
