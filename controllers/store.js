const Merchant = require('../models/Merchant');
const util = require('../util/util');

module.exports = {
    getById: async function (req, res, next) {
        if (!util.reqShouldContain(['id'])) {
            util.handleResponse(res, 'Missing store id.', null);
            return;
        }

        let id = req.query.id;
        let store = Merchant.findById(id);

        store = {
            name: store.name,
            category: store.category,
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
