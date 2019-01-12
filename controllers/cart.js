const Cart = require('../models/Cart');
const Good = require('../models/Good');
const util = require('../util/util');

module.exports = {
    getCart: async function (req, res, next) {
        let userId = req.jwt.payload.userId;

        let cart = await Cart.findById(userId).exec();

        cart = cart || {contents: []};
        cart = cart.contents;

        util.handleResponse(res, null, {cartItems: cart});
    },
    addToCart: async function (req, res, next) {
        if (!util.reqShouldContain(['id', 'options', 'amount'])) {
            util.handleResponse(res, 'Missing id, options, or amount.');
            return;
        }

        let goodId = req.body.id;
        let options = req.body.options;
        let amount = req.body.amount;

        let userId = req.jwt.payload.userId;
        let good = await Good.findById(goodId);
        let cart = await Cart.findById(userId);

        if (!good) {
            util.handleResponse(res, 'No such good.', null)
            return;
        }
        if (!cart) {
            await Cart.create({
                userId: userId,
                contents: [{
                    id: good._id,
                    name: good.name,
                    price: good.price,
                    amount: amount,
                    imgUrl: good.images[0] || null,
                    typeArgs: options
                }]
            })
        } else {
            cart.contents.push({
                id: good._id,
                name: good.name,
                price: good.price,
                amount: amount,
                imgUrl: good.images[0] || null,
                typeArgs: options
            });
            await cart.save();
        }

        util.handleResponse(res, null, {});
    },
    updateCart: async function (req, res, next) {
        if (!util.reqShouldContain(['contents'])) {
            util.handleResponse(res, 'Missing content', null);
            return;
        }

        // cart content
        let contents = req.body.contents;
        let userId = req.jwt.payload.userId;

        let cart = await Cart.findOneAndUpdate({
            userId: userId
        }, {
            contents: contents
        },{
            new: true
        });

        console.log(cart);

        if (!cart)
            util.handleResponse(res, 'No such user.', null);
        else
            util.handleResponse(res, null, {})
    }
};
