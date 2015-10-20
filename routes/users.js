var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'user.html'));
});

router.get('/tes', function(req, res, next) {
  res.json({"tes":"tes"})
})

module.exports = router;
