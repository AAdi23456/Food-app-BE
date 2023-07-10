const mongoose = require("mongoose")

const reg_schema = mongoose.Schema({
    
    name: String,
    email: String,
    password: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    }

})
const reg_model = mongoose.model("signupdetails", reg_schema)


module.exports = {reg_model}
