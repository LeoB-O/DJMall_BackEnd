const mongoose = require('mongoose')

let goodSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: {
        parentCate: String,
        subCate: String
    },
    options: [{
        name: String,
        values: [String]
    }],
    description: String,
    images: [String],
    pinyin: String,
    eName: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Good = mongoose.model('Good', goodSchema);
module.exports = Good;
