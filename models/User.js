const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


let userSchema = new mongoose.Schema({
    email: String,
    password: String
}, { timestamps: true});

userSchema.pre('save', async function(next) {
    // let salt = await bcrypt.genSalt(20);
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;