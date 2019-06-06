var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res
    .header('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = router;
