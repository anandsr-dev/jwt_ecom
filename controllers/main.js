const User = require('../models/user')
const Order = require('../models/order')

exports.cart = async (req, res) => {
    const { email, cart } = req.body
    await User.findOneAndUpdate({ email }, { cart })
    res.status(200).json({ msg: 'Cart added to user' })
}

exports.checkout = async (req, res) => {
    const { products, paymentIntent, address, email } = req.body
    const orderedBy = await User.findOne({ email })
    const order = {
        products,
        paymentIntent,
        address,
        orderedBy: orderedBy._id
    }
    await new Order(order).save()
    await User.findByIdAndUpdate(order.orderedBy, { $unset: { cart: 1 } })
    res.status(200).json({ msg: 'Order placed' })
}