var express = require('express');
var router = express.Router();

/* GET home page. */
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = router;
