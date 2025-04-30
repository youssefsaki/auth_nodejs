
const router = require('express').Router();
const {
    getUsers,
    createUser,
    loginUser
} = require('../controllers/userControllers');


router.get('/', getUsers);
router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;