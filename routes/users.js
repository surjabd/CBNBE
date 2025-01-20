var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hasan Ferdouse Sharing reloaded');
});


router.post('/', function(req, res, next) {
  res.send('User Account Created');
});
module.exports = router;
