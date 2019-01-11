const User = require('../models/User');
const util = require('../util/util');
const Order = require('../models/Order');
const Good = require('../models/Good')
module.exports = {
    getinfo: function (req, res, next) {

        let id = req.query.ID
        console.log(id)
        User.findOne({
            _id: id
        }, function (err, user) {
            if (user.avatar == null) {
                util.handleResponse(res, err, {
                    username: user.username,
                    avatar: 'avatar',
                    email: user.email,
                    password: user.password
                })
            } else {
                util.handleResponse(res, err, {
                    username: user.username,
                    avatar: 'user.avatar',
                    email: user.email,
                    password: user.password
                })
            }
        })
    },
    getorder: function (req, res, next) {
        let id = req.query.ID

        User.findOne({
            _id: id
        }, function (err, user) {
            let orderid = user.orderId
            let content = new Array(user.orderId.length)
            for (let oid in orderid) {

                let price = 0
                Order.findOne({
                    userId: oid
                }, function (err, order) {
                    let goods = order.goodIds
                    for (let gid in goods) {
                        Good.findOne({
                            _id: gid
                        }, function (err, good) {
                            price += good.price
                        })
                    }
                    content.pop({
                        id: oid,
                        price: price,
                        time: order.createdAt
                    })
                })
            }
            util.handleResponse(res, err, {
                content: content
            })
        })

    },
    getaddress: function (req, res, next) {
        let id = req.query.ID
        User.findOne({
            _id: id
        }, function (err, user) {
            let address = user.address
            util.handleResponse(res, err, {
                address: address
            })
        })
    },
    editaddress: function (req, res, next) {

    },
    editinfo: function (req, res, next) {
        let newusername = req.body.username
        let newpassword = req.body.password
        let newemail = req.body.email
        let oldusername = req.body.oldusername

        User.findOne().or([{
            username: username
        }, {
            email: email
        }]).exec(function (err, user) {
            if (user == null) {
                User.findOneAndUpdate({
                    username: oldusername
                }, {
                    username: newusername,
                    email: newemail,
                    password: newpassword
                }, function (err) {
                    util.handleResponse(res, err, {
                        ok: true
                    })
                })
            } else {
                Util.handleResponse(res, err, {
                    ok: false
                })
            }
        })



    }


}