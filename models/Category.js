const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    cateName: String,
    subCate: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Category = mongoose.Model('Category', categorySchema);
module.exports = Category;
