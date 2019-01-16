const User = require('../models/User');
const Util = require('../util/util');
const Mercant = require('../models/Merchant')
module.exports = {
    signup: async function (req, res, next) {
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        let permission = req.body.permission
        if (permission == '1') {
            let merchant = await Mercant.create({
                name: '',
                category: [{name: 'init', subCate: {name: 'init sub', goodIds: []}}]
            })

            User.findOne().or([{
                username: username
            }, {
                email: email
            }]).exec(function (err, user) {
                if (user == null) {
                    Util.handleResponse(res, err, {
                        ok: true
                    })
                    User.create({
                        username: username,
                        email: email,
                        password: password,
                        permission: permission,
                        merchantId: merchant._id
                    })
                } else {
                    Util.handleResponse(res, err, {
                        ok: false
                    })
                }
            })
        } else {
            User.findOne().or([{
                username: username
            }, {
                email: email
            }]).exec(function (err, user) {
                if (user == null) {
                    Util.handleResponse(res, err, {
                        ok: true
                    })
                    User.create({
                        username: username,
                        email: email,
                        password: password,
                        permission: permission,
                    })
                } else {
                    Util.handleResponse(res, err, {
                        ok: false
                    })
                }
            })
        }
    }
}
