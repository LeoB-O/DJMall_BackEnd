const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = mongoose.Schema({
    userId: String,
    contents: [{
        id: Schema.Types.ObjectId,
        name: String,
        price: Number,
        amount: Number,
        imgUrl: String,
        typeArgs: [{attrName: String, attrValue: String}]
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
