const Good = require('../models/Good');
const Merchant = require('../models/Merchant');
const util = require('../util/util');

module.exports = {
    getGoods: async function (req, res, next) {
        let goods = await Good.find();
        goods = goods.map((current) => {
            return {
                id: current._id,
                name: current.name,
                price: current.price,
                category: current.category,
                options: current.options,
                description: current.description,
                imgUrls: current.images
            }
        });

        util.handleResponse(res, null, {goods: goods})
    },
    getGoodsByCate: async function (req, res, next) {
        let cateStr = req.query.category;
        let pIndex = cateStr.indexOf('-');
        let parentCate = cateStr.slice(0, pIndex);
        let subCate = cateStr.slice(pIndex + 1);

        let goods = await Good.find({
            'category.parentCate': parentCate,
            'category.subCate': subCate
        });

        goods = goods.map((current) => {
            return {
                id: current._id,
                name: current.name,
                price: current.price,
                category: current.category,
                options: current.options,
                description: current.description,
                imgUrls: current.images,
            }
        });

        util.handleResponse(res, null, {goods: goods})
    },
    getGoodsByStoreAndCate: async function (req, res, next) {
        if (!util.reqShouldContain(['id', 'category'])) {
            util.handleResponse(res, 'Missing merchant id or category.', null);
            return;
        }

        let cateStr = req.query.category;
        let pIndex = cateStr.indexOf('-');
        let parentCate = cateStr.slice(0, pIndex);
        let subCate = cateStr.slice(pIndex + 1);

        let storeId = req.query.id;
        let merchant = await Merchant.findById(storeId);

        let goods = util.findInArray(merchant.category, 'name', parentCate);
        goods = util.findInArray(goods.subCate, 'name', subCate).goodIds;

        //TODO try to convert to array.map
        let ret = [];
        for (let g of goods) {
            let good = await Good.findById(g);
            ret.push({
                id: good._id,
                name: good.name,
                price: good.price,
                category: good.category,
                options: good.options,
                description: good.description,
                imgUrls: good.images,
            })
        }
        util.handleResponse(res, null, {goods: ret});
    },

    getGoodById: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing good id.', null);
            return;
        }

        let goodId = req.query.id;

        let good = await Good.findById(goodId);

        util.handleResponse(res, null, good);
    }
}
