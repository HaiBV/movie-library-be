const router = require('express').Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.use('/api', require('./api'));

module.exports = router;
