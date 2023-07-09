const { blacklistmodel } = require("../models/reg")
const jwt = require("jsonwebtoken")

const Validate = (req, res, next) => {
    try {
        const token = req.headers.token
        console.log(token);
        if (!token) {
            res.status(400).json({ msg: "Please Login First" })
        }
        const chcklogout=blacklistmodel.findOne({token})
        if(chcklogout.length>0){
            res.status(400).json({ msg: "Please Login First" })
        }
        const decoded = jwt.verify(token, "masai")
        console.log(decoded);
        req.body.email = decoded.email
        req.body.token = ""
        next()

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }


}


module.exports = Validate