const rest = require('restler');
const assert = require('chai').assert;
const User = require('../models/User');
const Order=require('../models/Order')
const Good = require('../models/Good');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const Merchant = require('../models/Merchant');
const mongoose = require('mongoose');
const credentials = require('../credentials');
const Mock = require('mockjs');
const Random = Mock.Random;

suite('Database test', function () {
    // connect to database
    mongoose.connect(credentials.mongo.development.connectionString)

    test('should be able to create database.', function (done) {
        User.deleteMany({}, function (err, raw) {
            assert(err === null);
        });
        User.create({
            username: 'admin',
            password: 'admin',
            email: 'admin@admin',
            permission: 0,
            avatar: 'avatar',
            address: [{
                id: '123',
                province: 'Hebei',
                city: 'ShiJiaZhuang',
                district: 'Yuhua',
                detail: 'xxxxx',
                phone: '17625113975',
                name: 'YZY'
            }]
        }, function (err, user) {
            console.log(err);
            assert(user.username === 'admin');
            done()
        })


    });

    test('should be able to create order',function(done){
        Order.deleteMany({},function (err,raw) {
            assert(err==null)
          })

          Order.create({

          })
    })

    test('should be able to create Good.', function (done) {
        Good.create({
            name: Random.string(3, 8),
            price: Random.float(1, 100),
            category: {
                parentCate: Random.string(3, 8),
                subCate: Random.string(3, 8)
            },
            options: [{
                name: Random.string(3, 8),
                values: [Random.natural(30, 50)]
            }],
            description: Random.paragraph(),
            images: [Random.image()],
            pinyin: Random.string(3, 8),
            eName: Random.string(3, 8)
        }).then(function (raw) {
            console.log(raw);
            assert(raw);
            done();
        }).catch(function (err) {
            console.log(err);
            done(err);
        });
    });

    test('should be able to add cart.', async function () {
        let user = await User.findOne({username: 'admin'});
        let cart = await Cart.findOne({userId: user._id});
        let good = await Good.findOne({});

        if (!cart) {
            let raw = await Cart.create({
                userId: user._id,
                contents: [{
                    id: good._id,
                    name: good.name,
                    amount: Random.natural(1, 10),
                    imgUrl: good.images[0],
                    typeArgs: [{
                        attrName: good.options[0].name,
                        attrValue: good.options[0].values[0]
                    }]
                }]
            });
            try {
                assert(raw);
                return new Promise(function (resolve, reject) {
                    resolve();
                });
            } catch (e) {
                return new Promise(function (resolve, reject) {
                    reject(e);
                });
            }
        } else {
            cart.contents.push({
                id: good._id,
                name: good.name,
                amount: Random.natural(1, 10),
                imgUrl: good.images[0],
                typeArgs: [{
                    attrName: good.options[0].name,
                    attrValue: good.options[0].values[0]
                }]
            });
            let raw = await cart.save();

            try {
                assert(raw);
                return new Promise(function (resolve, reject) {
                    resolve();
                });
            } catch (e) {
                return new Promise(function (resolve, reject) {
                    reject(e);
                });
            }
        }
    });

    test('should be able to add category.', async function () {
        let raw = await Category.create({
            cateName: Random.string(3, 10),
            subCate: [Random.string(3, 10), Random.string(3, 10)]
        });

        try {
            assert(raw);
            return new Promise(function (resolve, reject) {
                resolve();
            });
        } catch (e) {
            return new Promise(function (resolve, reject) {
                reject(e);
            });
        }
    });

    test('should be able to add merchant', async function () {
        let good = await Good.findOne({});

        let raw = await Merchant.create({
            name: Random.word(3, 10),
            category: [{
                name: Random.word(3, 10),
                subCate: [{
                    name: Random.word(3,10),
                    goodIds: [good._id]
                }]
            }]
        });

        try {
            assert(raw);
            return new Promise(function (resolve, reject) {
                resolve();
            });
        } catch (e) {
            return new Promise(function (resolve, reject) {
                reject(e);
            });
        }
    });
});


