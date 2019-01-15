const User = require('../models/User');
const Util=require('../util/util');

module.exports = {
    signup:function(req,res,next) {
        let username=req.body.username
        let email=req.body.email
        let password=req.body.email
        let permission=req.body.permission
        User.findOne().or([{username:username},{email:email}]).exec(function(err,user){
            if(user==null)
            {
                Util.handleResponse(res, err, {ok:true})
                User.create({username:username,email:email,password:password,permission:permission})
            }
            else
            {
                Util.handleResponse(res,err,{ok:false})
            }
        })
      }
}