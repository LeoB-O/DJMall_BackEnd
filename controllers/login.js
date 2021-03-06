const User = require('../models/User');
const util = require('../util/util');
const JWT = require('jwt-express');

module.exports = {
    login: function (req, res, next) {
        // req should contain username and password
        if (!util.reqShouldContain(['username', 'password'])(req)
            && !util.reqShouldContain(['email', 'password'])(req)) {
            util.handleResponse(res, 'Missing credentials', null);
            return;
        }

        let username = req.body.username || req.body.email;
        let password = req.body.password;

        // find user according to username
        User.findOne().or([{username: username}, {email: username}]).exec(function (err, user) {
            if (err) {
                util.handleResponse(res, err, null);
                return;
            }

            if (!user) {
                util.handleResponse(res, 'No such user', null);
                return;
            }

            if (user.validPassword(password)) {
                let jwt = res.jwt({
                    userId: user._id,
                    username: user.username,
                    permission: user.permission,
                    merchantId: user.merchantId
                });
                util.handleResponse(res, null, {
                    token:jwt.token,
                    roles: user.permission==0?['admin']:(user.permission<1000?['merchant']:[]),
                    introduction: 'introduction',
                    name: user.name,
                    uid: user._id
                });
            }
            else{
                util.handleResponse(res,'password error',null)
            }
        })
    },
    logout: function (req, res, next) {
        JWT.clear();
        util.handleResponse(res, null, {});
    }
};
