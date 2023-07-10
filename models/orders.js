const mongoose = require("mongoose")

const ordersSchema = mongoose.Schema({
    
       
         user : { type:String },
        // restaurant : {  ref: 'Restaurant' },
      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: String 
   
})
const ordersmodel = mongoose.model("orders", ordersSchema)



module.exports = { ordersmodel }
