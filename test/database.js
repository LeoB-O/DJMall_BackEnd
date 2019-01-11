const rest = require('restler');
const assert = require('chai').assert;
const User = require('../models/User');
const Good = require('../models/Good');
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
        User.create({username: 'admin', password: 'admin', email: 'admin@admin', permission: 0}, function (err, user) {
            console.log(err);
            assert(user.username === 'admin');
            done()
        })
    });

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
        }).then(function (err, raw) {
            assert(err === null);
            done();
        }).catch(function (err) {
            console.log(err);
            done();
        });
    });
});
