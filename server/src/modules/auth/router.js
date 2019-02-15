const { Router } = require('express');
const { registerUser, authenticateUser } = require('./controller');
const validations = require('./validation');

const router = Router();

router.post('/register', validations.authValidator, registerUser);
router.post('/authenticate', validations.authValidator, authenticateUser);

module.exports = router;
