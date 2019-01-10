const User = require('../models/User');
// const jwt = require('jwt-express');

module.exports = {
    login: function (req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({username: username}, function (err, user) {
            if(user.validPassword(password)) {
                let jwt = res.jwt({
                    username: user.username,
                    permission: user.permission,
                });
                res.send(jwt.token);
            }
        });
    }
};
