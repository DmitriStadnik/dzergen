var express = require('express');
var Dzerdan = require("../src/models/Dzerdan").Dzerdan;
var router = express.Router();

router.get('/', function(req, res, next) {
  const page = parseInt(request.query.page) || 0;
  const count = parseInt(request.query.count) || 20;
  Dzerdan.find()
    .sort('-dateCreated')
    .skip(page * count)
    .limit(count)
    .exec((err, items) => {
      if (err) return console.error(err);
      res.json(items);
    });
});

router.get('/:id', function(req, res, next) {
  Dzerdan.find(function (err, items) {
    if (err) return console.error(err);
    res.json(items);
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
