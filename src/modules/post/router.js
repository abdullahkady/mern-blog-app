const { Router } = require('express');
const { createPost, listAllPosts } = require('./controller');
const { isAuthenticated } = require('../auth/services');

const router = Router();

router.use(isAuthenticated);
router.post('/', createPost);
router.get('/', listAllPosts);

module.exports = router;
