module.exports = {
    getUser: function (req, res, next) {
        let userId = req.jwt.payload.userId;
        let username = req.jwt.payload.username;
        let permission = req.jwt.payload.permission;
        res.send({
            success: true,
            data: {
                id: req.jwt.payload.userId,
                uid: userId,
                token: req.query.token,
                roles: permission==0?['admin']:(permission<1000?['merchant']:[]),
                name: username,
                introduction: 'introduction'
            }
        });
    }
}
