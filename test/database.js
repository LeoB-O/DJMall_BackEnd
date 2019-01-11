const rest = require('restler');
const assert = require('chai').assert;
const User = require('../models/User');
const Order=require('../models/Order')
const Good = require('../models/Good');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
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

    //TODO
    test('should be able to add cart.', async function (done) {
        let user = await User.findOne({username: 'admin'});
        let cart = await Cart.findOne({userId: user._id});

        if (!cart) {

        }
    });

    //TODO
    test('should be able to add category.', function (done) {

    });

    //TODO
    test('should be able to add merchant', function (done) {

    });
});
   

