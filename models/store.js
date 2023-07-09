const mongoose = require("mongoose")

const catSchema = mongoose.Schema({
    cat1: { type: String, required: true },
    email: { type: String, required: true },
    cat2: { type: String, required: true },
    cat2: { type: String, required: true },

})
const catmodel = mongoose.model("categories", catSchema)



module.exports = { catmodel }
