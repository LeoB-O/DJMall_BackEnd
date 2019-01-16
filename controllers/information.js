const Good = require('../models/Good');
const Category = require('../models/Category');
const util = require('../util/util');

module.exports = {
    getIndexImage: async function (req, res, next) {
        let goods = await Good.find();

        goods = goods.slice(0, 5).map((current) => {
            return {
                imageUrl: current.images[0] || null,
                goodId: current.id
            }
        });

        util.handleResponse(res, null, {imgUrls: goods});
    },
    getCategories: async function (req, res, next) {
        let categories = await Category.find();

        categories = categories.map((current) => {
            return {
                name: current.cateName,
                value: current.subCate
            };
        });

        util.handleResponse(res, null, {menu: categories});
    }
};
