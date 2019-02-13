const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { NOT_FOUND, BAD_REQUEST } = require('http-status');

const router = require('./router');

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

// General error handler
app.use((err, req, res, next) => { // eslint-disable-line
  // If the error has no values, put in default values
  err.status = err.status || BAD_REQUEST;
  err.message = err.message || 'Something went wrong';

  const response = { message: err.message };
  // Indicate the validation violation in case of validation error
  if (err.message === 'validation error') {
    response.errors = err.errors;
  }

  return res.status(err.status).json(response);
});

// Catch all invalid routes
app.use((req, res) => {
  res.status(NOT_FOUND).json({ message: 'Endpoint not found !' });
});

module.exports = app;
