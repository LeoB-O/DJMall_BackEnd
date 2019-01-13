const User = require('../models/User');
const util = require('../util/util');
const Order = require('../models/Order');
const Good = require('../models/Good')
module.exports = {
    getinfo: function (req, res, next) {
        let id = req.jwt.payload.userId;
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
                    avatar: user.avatar,
                    email: user.email,
                    password: user.password
                })
            }
        })
    },
    getorder: async function (req, res, next) {
        let id = req.jwt.payload.userId;
        let user = await User.findOne({
            _id: id
        })
        let orderid = user.orderId

        let content = new Array()
        for (let oid of orderid) {
            console.log(oid)
            let price = 0
            let order = await Order.findOne({
                _id: oid
            })
            let goods = order.goodIds
            for (let gid of goods) {
                let good = await Good.findOne({
                    _id: gid
                })
                price += good.price
            }
            let time = util.formatDate(new Date(order.createdAt),"yyyy-MM-dd hh:mm:ss")
            content.push({
                id: oid,
                price: price,
                time: time
            })
        }
        util.handleResponse(res, null, {
            content: content
        })
    },
    getorderdetail:async function(req,res,next){
        let orderid=req.query.orderid
        let order=await Order.findOne({_id:orderid})
        let goodids=order.goodIds
        let goods=new Array()
        for(let g of goodids)
        {
            let good=await Good.findOne({_id:g});
            goods.push({
                id:good._id,
                name:good.name,
                image:good.images[0],
                price:good.price,
                description:good.description
            })
        }
        util.handleResponse(res,null,{goods:goods})
    } ,
    getaddress: function (req, res, next) {
        let id = req.jwt.payload.userId;
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
        let addressid = req.body.AddressID
        let id = req.jwt.payload.userId;
        let province = req.body.province
        let city = req.body.city
        let district = req.body.district
        let detail = req.body.detail
        let name = req.body.name

        User.findOne({}, function (err, user) {
            let address = user.address
            for (let ad in address) {
                if (address[ad]._id == addressid) {
                    address[ad].province = province
                    address[ad].city = city
                    address[ad].district = district
                    address[ad].detail = detail
                    address[ad].name = name
                }

            }
            console.log(address)
            User.findOneAndUpdate({
                _id: uid
            }, {
                address: address
            }, function (err) {
                if (err) {
                    util.handleResponse(res, err, {
                        ok: false
                    })
                } else {
                    util.handleResponse(res, err, {
                        ok: true
                    })
                }
            })

        })
    },
    editinfo: function (req, res, next) {
        let newusername = req.body.username
        let newpassword = req.body.password
        let newemail = req.body.email
        let oldusername = req.jwt.payload.username

        User.findOne().or([{
            username: newusername
        }, {
            email: newemail
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
    },
    deletead: function (req, res, next) {
        let id = req.jwt.payload.userId;
        let username = req.body.username
        User.findOne({
            username: username
        }, function (err, user) {
            for (let ad in user.address) {
                if (user.address[ad]._id == id) {
                    user.address.splice(ad, 1)
                }
            }
            user.save();
            if (err) {
                util.handleResponse(res, err, {
                    ok: false
                })
            } else {
                util.handleResponse(res, err, {
                    ok: true
                })
            }
        })
    }


}