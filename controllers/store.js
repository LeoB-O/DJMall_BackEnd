const Merchant = require('../models/Merchant');
const Category = require('../models/Category');
const util = require('../util/util');

module.exports = {
    getById: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing store id.', null);
            return;
        }
        if (req.query.id == 'undefined') {
            util.handleResponse(res, 'Missing store id', null);
            return;
        }

        let id = req.query.id || req.jwt.payload.merchantId;
        console.log(id)
        let store = await Merchant.findById(id);
        if (!store) {
            util.handleResponse(res, 'No such store', null)
            return;
        }
        let category = store.category;

        category = category.map((current) => {
            return {
                name: current.name,
                value: current.subCate.map((current) => {
                    return current.name;
                }),
                subCate: current.subCate
            };
        });

        store = {
            name: store.name,
            category: category,
        };

        util.handleResponse(res, null, store);
    },
    getAll: async function (req, res, next) {
        let stores = await Merchant.find();
        stores = stores.map((current) => {
            return {
                id: current._id,
                name: current.name,
                category: current.category,
            }
        });

        util.handleResponse(res, null, {stores: stores});
    },
    editStore: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing merchant id.', null);
            return;
        }

        let id = req.body.id;
        let name = req.body.name;
        let category = req.body.category;

        let store = await Merchant.findById(id)

        if (!store)  {
            util.handleResponse(res, 'No such store', null);
            return;
        }

        name = name || store.name;
        category = category || store.category;

        store.name = name;
        store.category = category;

        await store.save();

        category = category.map((current) => {
            return {
                cateName: current.name,
                subCate: current.subCate.map((subCate) => {
                    return subCate.name;
                })
            }
        });

        for (let c of category) {
            let cate = await Category.findOne({cateName: c.cateName});

            if (!cate) {
                await Category.create(c);
                continue;
            }

            let exist = false;
            for (let s of c.subCate) {
                exist = false;
                for (let ss of cate.subCate) {
                    if (s == ss) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    cate.subCate.push(s);
                }
            }
            await cate.save();
        }

        util.handleResponse(res, null, {});
    },
    addStore: async function (req, res, next) {
        if (!util.reqShouldContain(['name'])) {
            util.handleResponse(res, 'Missing store name.', null);
            return;
        }

        let storeName = req.body.name;

        await Merchant.create({
            name: storeName,
            category: [{
                name: 'init',
                subCate: [{
                    name: 'init sub',
                    goodIds: []
                }]
            }]
        })

        util.handleResponse(res, null, {});
    },
    deleteStore: async function(req, res, next) {
        if(!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing store id', null);
            return;
        }

        let id = req.query.id
        let store = await Merchant.findOneAndDelete({_id: id});

        if (!store) {
            util.handleResponse(res, 'No such store.', null);
            return;
        }

        util.handleResponse(res, null, {});
    }
};
