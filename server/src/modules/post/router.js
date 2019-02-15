const { Router } = require('express');
const { createPost, listAllPosts } = require('./controller');
const { isAuthenticated } = require('../auth/services');
const validations = require('./validation');

const router = Router();

router.use(isAuthenticated);
router.post('/', validations.postValidator, createPost);
router.get('/', listAllPosts);

module.exports = router;
