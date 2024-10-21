const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     unique_id: { type: String },
     userNickName: { type: String },
     userName: {type: String},
     userPass: { type: String },
     userMail: { type: String },
     userCreatedAt: { type: String, default: Date.now() },
})

module.exports = mongoose.model("User.Model",userSchema)