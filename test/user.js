const rest = require('restler');
const assert = require('chai').assert;
const User = require('../models/User');
const mongoose = require('mongoose');
const credentials = require('../credentials');

suite('User related api.', function () {
    let base = 'http://localhost:3000';

    mongoose.connect(credentials.mongo.development.connectionString);

    test('should be able to login with username.', function (done) {
        rest.post(base+ '/login', {data: {username: 'admin', password: 'admin'}}).on('success', function (data) {
            assert(data.success===true);
            done();
        });
    });
});
