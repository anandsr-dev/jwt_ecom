const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/auth')
const { cart, checkout } = require('../controllers/main')
const { authenticate } = require('../middlewares/authMiddleware')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/cart').post(authenticate, cart)
router.route('/checkout').post(authenticate, checkout)

module.exports = router





