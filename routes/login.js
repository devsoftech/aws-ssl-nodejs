var express, router;
express = require('express');
router = express.Router();

function list() {

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('index');
});
// define the about route
router.get('/login', function(req, res) {
  res.send('About login');
});
}
module.exports = router;

