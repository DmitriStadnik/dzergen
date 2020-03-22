const express = require('express');
const Collection = require('../src/controllers/Collection')
// const Market = require('../src/controllers/Market')
const router = express.Router();

router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 0;
  const count = parseInt(req.query.count) || 20;
  const rarityParam = req.query.rarity && req.query.rarity !== null ? parseInt(req.query.rarity) : null;
  const nameParam = req.query.name || null;
  const aliveParam = req.query.alive || null;
  const owner = null;
  const noOwner = req.query.noOwner || false;

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

  Collection.countItems(rarityParam, nameParam, aliveParam, owner, sendResponse, noOwner);
  Collection.getItems(rarityParam, nameParam, aliveParam, owner, page, count, sendResponse, noOwner);
});

module.exports = router;

