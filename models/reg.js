const mongoose = require("mongoose")

const reg_schema = mongoose.Schema({
    name: { type: String,required:true},
    email: { type: String,required:true},
    password: { type: String,required:true},

})
const reg_model = mongoose.model("signupdetails", reg_schema)

const blacklistSchema=mongoose.Schema({
    token:{type:String,require:true}
})
const blacklistmodel=mongoose.model("blacklisted",blacklistSchema)
module.exports = {reg_model,blacklistmodel}
