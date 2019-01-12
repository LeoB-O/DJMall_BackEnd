const Good = require('../models/Good');
const util = require('../util/util');

module.exports={
    search:async function(req,res,next){
        let searchinput=req.body.searchinput
        var query={}
        var query1={}
        var query2={}
        query1['eName']=new RegExp(searchinput)
        query2['pinyin']=new RegExp(searchinput)
        let goods=await Good.find().or([query1,query2])
        console.log(goods)
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