require('dotenv').config();

const { PORT, MONGO_URI, JWT_SECRET } = process.env;

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
};
