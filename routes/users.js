const express = require('express');
const User = require("../src/models/User").User;
const router = express.Router();

// router.get('/register', function(req, res, next) {
// });

// router.post('/save', function(req, res, next) {
//   let item = new Dzerdan({
//     ...req.body
//   });
//   item.save(function (err) {
//     if (err) return console.error(err);
//   });
//   res.json(item);
// });

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404')
  }
});

module.exports = router;
