const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    permission: Number,
    orderId: [Schema.Types.ObjectId],
    avatar: String,
    address: [{
        province: String,
        city: String,
        district: String,
        detail: String,
        phone: String,
        name: String
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

//TODO should not save password with clear text
userSchema.methods.validPassword = function(password) {
    return password===this.password;
};
let User = mongoose.model('User', userSchema);
module.exports = User;
