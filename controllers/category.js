const Category = require('../models/Category');
const Merchant = require('../models/Merchant');
const util = require('../util/util');

module.exports = {
    updateCategory: async function (req, res, next) {
        let merchants = await Merchant.find();
        let categories = await Category.find();
        let updateCates = [];
        let parentCateExist = false;
        let subCateExist = false;

        for (let merchant of merchants) {
            for (let merchantCate of merchant.category) {
                parentCateExist = false;
                subCateExist = false;
                for (let category in updateCates) {
                    if (updateCates[category].cateName == merchantCate.name) {
                        parentCateExist = true;
                        break;
                    }
                    if (parentCateExist) {
                        for (let merchantSubCate of merchantCate.subCate) {
                            for (let cateSubCate in updateCates[category].subCate) {
                                if (merchantCate.name == updateCates[category].subCate[cateSubCate]) {
                                    subCateExist = true;
                                }
                            }
                            if (!subCateExist) {
                                updateCates[category].subCate.push(merchantSubCate.name)
                            }
                            subCateExist = false;
                        }
                    }
                }
                if (!parentCateExist) {
                    updateCates.push({
                        cateName: merchantCate.name,
                        subCate: merchantCate.subCate.map((current) => {
                            return current.name;
                        })
                    });
                }
                parentCateExist = false;

            }
        }
        await Category.deleteMany({});
        for (let updateCate of updateCates) {
            Category.create(updateCate)
        }

        util.handleResponse(res, null, {});
    }
}
