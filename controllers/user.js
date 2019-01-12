module.exports = {
    getUser: function (req, res, next) {
        res.send({
            success: true,
            data: {
                id: req.jwt.payload.userId
            }
        });
    }
}
