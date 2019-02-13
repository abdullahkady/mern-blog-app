const { Router } = require('express');
const { createPost, getPosts } = require('./controller');
const { isAuthenticated } = require('../auth/services');

const router = Router();

router.use(isAuthenticated);
router.post('/', createPost);
router.get('/', getPosts);

module.exports = router;
