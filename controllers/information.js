const Good = require('../models/Good');
const util = require('../util/util');

module.exports = {
    getIndexImage: async function (req, res, next) {
        let goods = await Good.find();

        goods = goods.slice(0, 5).map((current) => {
            return current.images[0] || null;
        });

        util.handleResponse(res, null, {imgUrls: goods});
    }
};
