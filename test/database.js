const rest = require('restler');
const assert = require('chai').assert;
const User = require('../models/User');
const Order=require('../models/Order')
const mongoose = require('mongoose');
const credentials = require('../credentials');

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
});