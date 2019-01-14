const mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    from: String,
    to: String,
    contents: [{
        time: Date,
        message: String,
        unread:Boolean
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

let Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
