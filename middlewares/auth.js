const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
      req.user = {
        id: '',
        role: 'anonymous'
      };
    } else {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      req.user = decoded.user;
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
