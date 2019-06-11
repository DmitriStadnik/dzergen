var express = require('express');
var Dzerdan = require("../src/models/Dzerdan").Dzerdan;
var router = express.Router();

router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const rarity = parseInt(req.query.rarity) || null;
  const nameParam = req.query.name.toLowerCase() || null;

  const query = Dzerdan.find()
    
  if (rarity) query.where('rarity').gte(rarity);
  if (nameParam) query.$where(function () {
    let fullName = this.name[0] + this.name[1];
    return fullName.toLowerCase().indexOf(nameParam) !== -1;
  });

  query
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
