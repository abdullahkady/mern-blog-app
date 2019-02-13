const { Router } = require('express');

const authRouter = require('./modules/auth/router');
const { isAuthenticated } = require('./modules/auth/services');

const router = new Router();

router.use('/auth', authRouter);

router.use('/blogs', isAuthenticated, (req, res) => res.send('Hello world!'));

module.exports = router;
