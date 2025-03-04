const express = require('express')
const router = express.Router()
const Login = require('../controllers/login')

router.get('/', (req, res) => {
    res.redirect("/login")
})

// login
router.get('/login', Login.loginPage)
router.post('/login', Login.postLogin)
router.get('/register', Login.registerPage)
router.post('/register', Login.postRegister)

router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

module.exports = router