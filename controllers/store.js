const Merchant = require('../models/Merchant');
const util = require('../util/util');

module.exports = {
    getById: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing store id.', null);
            return;
        }
        if (req.query.id == 'undefined') {
            util.handleResponse(res, 'Missing store id', null);
        }

        let id = req.query.id;
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
                })
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
                name: current.name,
                category: current.category,
            }
        });

        util.handleResponse(res, null, {stores: stores});
    }
};
