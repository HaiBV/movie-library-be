const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { isEmail } = require('utils/validator');

function AuthController(User) {
  const index = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  const loginOrResgiter = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ errors: [{ msg: 'Password không chính xác!' }] });
        }
      } else {
        if (!isEmail(email) || password === '') {
          return res.status(400).json({ errors: [{ msg: 'Email, password không đúng định dạng' }] });
        }

        user = new User({
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      console.log(payload);
      jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          throw err;
        }
        return res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  return {
    index,
    loginOrResgiter,
  };
}

module.exports = AuthController;
