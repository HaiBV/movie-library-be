const router = require('express').Router();
const auth = require('middlewares/auth');
const User = require('models/User');
const AuthController = require('controllers/api/AuthController')(User);

router.get('/', auth, AuthController.index);
router.post('/', AuthController.loginOrResgiter);

module.exports = router;
