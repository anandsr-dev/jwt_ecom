const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

const orderSchema = new Schema({
    products: [
        {
            product_id: String,
            count: Number,
            color: String,
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'Not processed',
        enum: [
            'Not processed',
            'Cash On Delivery',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Completed'
        ]
    },
    address: {},
    orderedBy: { type: ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)