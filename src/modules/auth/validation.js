const Joi = require('joi');
const validate = require('express-validation');

const authSchema = {
  username: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .required(),
};

const authValidator = validate({ body: authSchema });

module.exports = { authValidator };
