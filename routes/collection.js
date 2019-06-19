const express = require('express');
const Dzerdan = require("../src/models/Dzerdan").Dzerdan;
const Collection = require('../src/controllers/Collection')
const router = express.Router();

router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const rarityParam = parseInt(req.query.rarity) || null;
  const nameParam = req.query.name || null;
  const aliveParam = req.query.alive || null;
  // const created = req.query.created || null;

  let itemsCount = null;
  let items = null;

  function sendResponse(variant, item) {
    if (variant) {
      itemsCount = item;
    } else {
      items = item;
    }

    if (itemsCount && items) {
      res.json({
        count: itemsCount,
        data: items
      });
    }
  }

  Collection.countItems(rarityParam, nameParam, aliveParam, sendResponse);
  Collection.getItems(rarityParam, nameParam, aliveParam, page, count, sendResponse);
});

// router.get('/update-base', function(req, res, next) {
//   Dzerdan.find(function (err, items) {
//     if (err) return console.error(err);
//
//     items.forEach(e => {
//       if (!e.nameStr) {
//         e.nameStr = e.name.join('');
//         e.save();
//       }
//     });
//
//     res.json(items);
//   });
// });

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
