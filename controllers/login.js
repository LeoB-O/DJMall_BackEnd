const User = require('../models/User');
const util = require('../util/util');

module.exports = {
    login: function (req, res, next) {
        // req should contain username and password
        if (!util.reqShouldContain(['username', 'password'])(req)
            && !util.reqShouldContain(['email', 'password'])(req)) {
            util.handleResponse(res, 'Missing credentials', null);
        }

        let username = req.body.username || req.body.email;
        let password = req.body.password;

        // find user according to username
        User.findOne().or([{username: username}, {email: username}]).exec(function (err, user) {
            if (err) util.handleResponse(res, err, null);

            if (!user) util.handleResponse(res, 'No such user', null);

            if (user.validPassword(password)) {
                let jwt = res.jwt({
                    userId: user._id,
                    username: user.username,
                    permission: user.permission,
                });
                util.handleResponse(res, null, jwt.token);
            }
        })
    }
};
