const { CREATED, OK } = require('http-status');
const Post = require('./model');

const createPost = async (req, res, next) => {
  const { post } = req.body;
  const { _id } = req.decodedToken;
  try {
    const postDocument = await Post.create({ text: post, author: _id });
    const createdPost = postDocument.toJSON();
    return res.status(CREATED).json(createdPost);
  } catch (err) {
    return next(err);
  }
};

const listAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author');
    return res.status(OK).json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  listAllPosts,
};
