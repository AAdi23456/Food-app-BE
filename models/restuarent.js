const mongoose = require("mongoose")

const restuarentSchema = mongoose.Schema({
       
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
         
          name: String,
          description: String,
          price: Number,
          image: String
        }]
})
const restuarentmodel = mongoose.model("restaurants", restuarentSchema)



module.exports = { restuarentmodel }
