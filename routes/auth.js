const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/auth')
const { cart, checkout } = require('../controllers/main')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/cart').post(cart)

module.exports = router





