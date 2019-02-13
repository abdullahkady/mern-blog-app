const Joi = require('joi');
const validate = require('express-validation');

const postSchema = {
  post: Joi.string().required(),
};

const postValidator = validate({ body: postSchema });

module.exports = { postValidator };
