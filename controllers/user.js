const User=require('../models/User')
const util=require('../util/util')
module.exports = {
    getUser: function (req, res, next) {
        let userId = req.jwt.payload.userId;
        let username = req.jwt.payload.username;
        let permission = req.jwt.payload.permission;
        let merchantId = req.jwt.payload.merchantId;
        res.send({
            success: true,
            data: {
                id: req.jwt.payload.userId,
                merchantId: merchantId || '',
                uid: userId,
                token: req.query.token,
                roles: permission==0?['admin']:(permission<1000?['merchant']:[]),
                name: username,
                introduction: 'introduction'
            }
        });
    },
    deleteUser:function(req,res,next){
        let username=req.query.username
        console.log(username)
        User.deleteOne({
            username: username
        }, function (err, user) {
            if (err) {
                util.handleResponse(res, err, {
                    ok: false
                })
            } else {
                util.handleResponse(res, err, {
                    ok: true
                })
            }
        })
    },
    getUsers:function(req,res,next){
        User.find({
            permission:1
        },function(err,user){
            user=user.map((current)=>{
                return{
                    id:current._id,
                    username:current.username,
                    email:current.email,
                    avatar:current.avatar,
                    permission:current.permission
                }
            })
            if(err)
            {
                util.handleResponse(res,err,{})
            }
            else
            {
                util.handleResponse(res,err,{users:user})
            }
        })
    }
}
