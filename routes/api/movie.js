const router = require('express').Router();
const auth = require('middlewares/auth');

const Movie = require('models/Movie');
const User = require('models/User');

const MovieController = require('controllers/api/MovieController')(User, Movie);

router.get('/', MovieController.getMovies);
router.post('/', auth, MovieController.store);

module.exports = router;
