let mongoose = require('mongoose');

let merchantSchema = mongoose.Schema({
    name: String,
    category: [{
        name: String,
        subCate: [{
            name: String,
            goodIds: [String]
        }]
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Merchant = mongoose.Model('Merchant', merchantSchema);

module.exports = Merchant;
