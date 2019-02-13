const { Router } = require('express');

const authRouter = require('./modules/auth/router');
const postsRouter = require('./modules/post/router');
const { isAuthenticated } = require('./modules/auth/services');

const router = Router();

router.use('/auth', authRouter);

router.use('/posts', isAuthenticated, postsRouter);

module.exports = router;
