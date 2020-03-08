const express = require('express');
const Dzerdan = require("../src/models/Dzerdan").Dzerdan;
const Collection = require('../src/controllers/Collection')
const router = express.Router();

router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const rarityParam = req.query.rarity && req.query.rarity !== null ? parseInt(req.query.rarity) : null;
  const nameParam = req.query.name || null;
  const aliveParam = req.query.alive || null;
  const showAll = req.query.showAll || false;
  const owner = req.query.owner || null;

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

  Collection.countItems(rarityParam, nameParam, aliveParam, showAll, owner, sendResponse);
  Collection.getItems(rarityParam, nameParam, aliveParam, showAll, owner, page, count, sendResponse);
});

router.get('/count', function(req, res, next) {
  const rarityParam = req.query.rarity && req.query.rarity !== null ? parseInt(req.query.rarity) : null;
  const nameParam = req.query.name || null;
  const aliveParam = req.query.alive || null;
  const showAll = req.query.showAll || false;
  const owner = req.query.owner || null;

  function sendResponse(variant, item) {
    if (item) {
      res.json({
        count: item,
      });
    }
  }

  Collection.countItems(rarityParam, nameParam, aliveParam, showAll, owner, sendResponse);
});

// router.get('/update-base', function(req, res, next) {
//   Dzerdan.find(function (err, items) {
//     if (err) return console.error(err);

//     items.forEach(e => {
//         e.name = [{
//           word: e.name[0].word,
//           value: 1
//         },
//         {
//           word: e.name[1].word,
//           value: 1
//         }]
//         e.save();
//     });

//     res.json(items);
//   });
// });

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
