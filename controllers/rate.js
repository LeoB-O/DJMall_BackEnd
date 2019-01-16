const util = require('../util/util');
const Good = require('../models/Good');



module.exports = {
    commitrate: async function (req, res, next) {
        let goodid=req.body.id
        let crate=Number.parseInt(req.body.rate)
        let rate=await Good.findOne({
            _id:goodid
        });

        let goodrate=rate.Rate.rate
        let num=rate.Rate.ratenum
        let total=goodrate*num+crate
        console.log('total'+total)
        let current=total/(num+1)
        console.log('current '+current)
        // let current=(goodrate*num+crate)/(num+1)
        rate.Rate.rate=current
        rate.Rate.ratenum=num+1
        rate.save()

        util.handleResponse(res,null,{})
    },
    getrate: async function (req, res, next) {
        let goodid=req.query.goodid
        let rate=await Good.findOne({
            _id:goodid
        });
        let goodrate=rate.Rate.rate;
        util.handleResponse(res,null,{goodrate:goodrate})
    }
}
