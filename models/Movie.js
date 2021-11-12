const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Movie = mongoose.model('movies', MovieSchema);

module.exports = Movie;
