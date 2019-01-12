const Good = require('../models/Good');
const util = require('../util/util');

module.exports={
    search:async function(req,res,next){
        let searchinput=req.query.search
        let query={name: new RegExp(searchinput)}
        let query1={eName: new RegExp(searchinput)}
        let query2={pinyin: new RegExp(searchinput)}
        let goods=await Good.find().or([query,query1,query2]).exec()
        goods=goods.map((current)=>{
            return {
                id:current._id,
                name:current.name,
                imageUrl:current.images[0],
                price:current.price,
                description:current.description
            }
        })
        util.handleResponse(res,null,{goods:goods})


    }
}
