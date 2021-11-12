const ytdl = require('ytdl-core');

function MovieController(User, Movie) {
  const getMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.json(movies);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  };

  const store = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(400).send({ error: true, message: 'User not found!' });
      }

      const { url } = req.body;

      if (!ytdl.validateURL(url)) {
        return res.status(400).send({ error: true, message: 'Youtube URL not validate!' });
      }

      const metaData = await ytdl.getInfo(url);
      const { title, description } = metaData.videoDetails;
      const movieId = ytdl.getURLVideoID(url);

      const newMovie = new Movie({
        url: req.body.url,
        user_email: user.email,
        title,
        description,
        movie_id: movieId,
      });

      const movie = await newMovie.save();

      return res.json({ movie });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  };

  return {
    getMovies,
    store,
  };
}

module.exports = MovieController;
