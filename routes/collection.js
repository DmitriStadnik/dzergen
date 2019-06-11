var express = require('express');
var Dzerdan = require("../src/models/Dzerdan").Dzerdan;
var router = express.Router();

function countItems(query, callback) {
  if (callback) {
    query
      .countDocuments()
      .exec((err, count) => {
        if (err) return console.error(err);
        callback(count)
      });
  } 
}

router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const rarityParam = parseInt(req.query.rarity) || null;
  const nameParam = req.query.name || null;
  const aliveParam = req.query.alive || null;
  // const created = req.query.created || null;

  const query = Dzerdan.find()
    
  if (rarityParam) query.where('rarity').gte(rarityParam);
  if (aliveParam) query.where('alive').eq(aliveParam);
  if (nameParam) query.$where("(this.name[0] + this.name[1]).toLowerCase().indexOf('" + nameParam.toLowerCase() + "') !== -1");
  // if (created) {
  //   query.$where("(this.name[0] + this.name[1]).toLowerCase().indexOf('" + nameParam.toLowerCase() + "') !== -1");
  // }

  query
    .sort('-dateCreated')
    .skip(page * count)
    .limit(count)
    .exec((err, items) => {
      if (err) return console.error(err);
      countItems(query, (itemsCount) => {
        res.json({
          count: itemsCount,
          data: items
        });
      });
      
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
