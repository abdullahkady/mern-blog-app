const { Router } = require('express');
const { registerUser, authenticateUser } = require('./controller');
const validations = require('./validation');

const router = Router();

router.use(validations.authValidator);
router.post('/register', registerUser);
router.post('/authenticate', authenticateUser);

module.exports = router;
