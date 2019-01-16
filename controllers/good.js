const Good = require('../models/Good');
const Merchant = require('../models/Merchant');
const Category = require('../models/Category');
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
                imgUrls: current.images,
                merchantID: current.merchantID
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
                imageUrl: current.images[0],
                merchantID: current.merchantID,
                rate: current.Rate.rate
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
            if (!good) continue;
            ret.push({
                id: good._id,
                name: good.name,
                price: good.price,
                category: good.category,
                options: good.options,
                description: good.description,
                imgUrls: good.images,
                merchantID: good.merchantID,
                rate: good.Rate.rate
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
        good = {
            id: good._id,
            name: good.name,
            price: good.price,
            category: good.category,
            options: good.options,
            description: good.description,
            imgUrls: good.images,
            merchantId: good.merchantID,
            rate: good.Rate.rate
        };

        util.handleResponse(res, null, good);
    },

    addGood: async function (req, res, next) {
        if (!util.reqShouldContain(['name', 'price'])) {
            util.handleResponse(res, 'Missing name or price', null);
            return;
        }
        let name = req.body.name;
        let price = req.body.price;
        let category = req.body.category || {};
        let options = req.body.options || [];
        let description = req.body.description || '';
        let images = req.body.images || [];
        let pinyin = req.body.pinyin || '';
        let eName = req.body.eName || '';
        let merchantID = req.jwt.payload.merchantId || '';

        let good = await Good.create({
            name: name,
            price: price,
            category: category,
            options: options,
            description: description,
            images: images,
            pinyin: pinyin,
            eName: eName,
            merchantID: merchantID
        });

        let merchant = await Merchant.findById(merchantID);
        let parentCateExist = false;
        let subCateExist = false;

        for (let c in merchant.category) {
             if (merchant.category[c].name == category.parentCate) {
                 parentCateExist = true;
             }
             for (let s in merchant.category[c].subCate) {
                 if (merchant.category[c].subCate[s].name == category.subCate) {
                     subCateExist = true;
                     if (parentCateExist && subCateExist) {
                        merchant.category[c].subCate[s].goodIds.push(good._id);
                     }
                 }
             }
             if (parentCateExist && !subCateExist) {
                 merchant.category[c].subCate.push({
                     name: category.subCate,
                     goodIds: [good._id]
                 });
             }
        }

        if (!parentCateExist) {
            console.log('???Not exist')
            merchant.category.push({
                name: category.parentCate,
                subCate: [{
                    name: category.subCate,
                    goodIds: good._id
            }]});
        }

        await merchant.save()

        util.handleResponse(res, null, {});
    },

    deleteGoodById: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing id.', null);
            return;
        }

        let id = req.query.id;

        let good = await Good.findOneAndDelete({_id: id});

        if (!good) {
            util.handleResponse(res, 'No such good.', null);
            return;
        }
        util.handleResponse(res, null, {deleted: good});
    },

    modifyGood: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing id.', null);
            return;
        }

        let good = await Good.findById(req.body.id);

        if (!good) {
            util.handleResponse(res, 'No such good.', null);
            return;
        }

        let name = req.body.name || good.name;
        let price = req.body.price || good.price;
        let goodCate = req.body.category || good.category;
        let cateCate = {
                cateName: goodCate.cateName || goodCate.parentCate,
                subCate: goodCate.subCate
            }
        let options = req.body.options || good.options;
        let description = req.body.description || good.description;
        let images = req.body.images || good.images;
        let pinyin = req.body.pinyin || good.pinyin;
        let eName = req.body.eName || good.eName;
        let merchantID = req.body.merchantID || good.merchantID;

        let cate = await Category.findOne({cateName: cateCate.cateName});
        if (!cate) {
            let c = await Category.create(cateCate);
        } else {
            let exist = false;
            for (let c of cate.subCate) {
                if (cateCate.subCate == c) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                cate.subCate.push(cateCate.subCate);
                await cate.save();
            }
        }

        let merchant = await Merchant.findById(merchantID);
        let parentCateExist = false;
        let subCateExist = false;

        for (let c in merchant.category) {
            if (!merchant.category[c].name || merchant.category[c].name==undefined) {
                continue;
            }
            if (merchant.category[c].name == cateCate.cateName) {
                parentCateExist = true;
            }
            for (let s in merchant.category[c].subCate) {
                if (!merchant.category[c].subCate || merchant.category[c].subCate==undefined) {
                    continue;
                }
                if (merchant.category[c].subCate[s].name == cateCate.subCate) {
                    subCateExist = true;
                    if (parentCateExist && subCateExist) {
                        merchant.category[c].subCate[s].goodIds.push(good._id);
                    }
                }
            }
            if (parentCateExist && !subCateExist) {
                console.log('test'+ merchant.category[c].subCate)
                if (merchant.category[c].subCate == undefined) {
                    continue;
                }
                merchant.category[c].subCate.push({
                    name: cateCate.subCate,
                    goodIds: [good._id]
                });
            }
        }

        if (!parentCateExist) {
            console.log('???Not exist')
            merchant.category.push({
                name: cateCate.cateName,
                subCate: [{
                    name: cateCate.subCate,
                    goodIds: good._id
                }]});
        }

        await merchant.save()

        await Good.updateOne({_id: req.body.id}, {
            name: name,
            price: price,
            category: goodCate,
            options: options,
            descriptions: description,
            images: images,
            pinyin: pinyin,
            eName: eName,
            merchantID: merchantID
        });
        console.log(goodCate)

        util.handleResponse(res, null, {});
    }
}
