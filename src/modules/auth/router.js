const { Router } = require('express');
const { registerUser, authenticateUser } = require('./controller');

const router = new Router();

router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);

module.exports = router;
