const mongoose = require('mongoose');
const Schema = mongoose.Schema

let orderSchema = mongoose.Schema({
    goodIds: [Schema.Types.ObjectId],
    userId: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Order = mongoose.model('Order', orderSchema);
module.exports = Order;
