var express = require('express');
var generator = require('../src/controllers/Generator');
var router = express.Router();

let generatedItem = {};

router.get('/generate', function(req, res, next) {
  const creatorId = null;
  generatedItem = generator.generate(creatorId);
  res.json(generatedItem);
});

router.get('/list', function(req, res, next) {

});

router.post('/save', function(req, res, next) {
  // db.get().collection('dzerdan').insertOne(generatedItem, (err, r) => {
  //   if (err) response.send("An error occured", err)
  //   else response.send('OK');
  // })
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
