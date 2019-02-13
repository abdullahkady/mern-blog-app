const {
  OK, CREATED, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED,
} = require('http-status');
const User = require('./model');
const authService = require('./services');

const registerUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userDocument = await User.create({ username, password });

    // Cleanup the response, removing the hashed password
    const createdUser = userDocument.toJSON();

    return res.status(CREATED).json(createdUser);
  } catch (err) {
    // If this is a duplicate database key error
    if (err.code === 11000) {
      err.status = BAD_REQUEST;
      err.message = 'Username already exists';
    }
    return next(err);
  }
};

const authenticateUser = async (req, res, next) => {
  const { username: inputUsername, password } = req.body;

  try {
    const user = await User.findOne({ username: inputUsername });
    if (!user) {
      throw new Error('User Not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Password mismatch');
    }

    const { _id, username } = user.toJSON();
    const token = authService.signToken({ _id, username });

    return res.status(OK).json({ message: 'Successfully authenticated', token });
  } catch (err) {
    if (err.message === 'User Not found') {
      err.status = NOT_FOUND;
    } else {
      err.status = UNAUTHORIZED;
    }

    return next(err);
  }
};

module.exports = {
  registerUser,
  authenticateUser,
};
