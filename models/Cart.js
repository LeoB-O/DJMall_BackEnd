const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = mongoose.Schema({
    userId: String,
    contents: [Schema.Types.ObjectId],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
