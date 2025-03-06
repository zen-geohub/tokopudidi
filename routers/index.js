const express = require('express');
const router = express.Router();
const Login = require('../controllers/login');
const { isAdmin, isLogin } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.redirect("/login")
});

// login
router.get('/login', Login.loginPage);
router.post('/login', Login.postLogin);
router.get('/register', Login.registerPage);
router.post('/register', Login.postRegister);

// Global middleware
router.use(isLogin);

// Create user profile
router.get('/profile/register/:userName', Login.showCreateProfile);
router.post('/profile/register/:userName', Login.createProfile);

router.use('/admin', isAdmin, require('./admin'));
router.use('/user', require('./user'));
router.get('/logout', Login.logout);

module.exports = router;