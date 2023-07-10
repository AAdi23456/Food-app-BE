const express = require("express")
const Authorization = express.Router()
const bcrypt = require("bcrypt")
const { reg_model, blacklistmodel } = require("../models/user")
const Validate = require("../middleware/validation")
const jwt = require("jsonwebtoken")
const register=express.Router()
const login=express.Router()
register.post("/", async (req, res) => {
  const { name, email, password,address } = req.body
  console.log(req.body);
  try {
    const userr = await reg_model.findOne({ email })
    console.log(userr);
    if (userr) {
      return res.status(200).json({ msg: "user already exist" })
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      const datatodb = new reg_model({ name, email, password: hash,address })
      await datatodb.save()
      res.status(201).json({ msg: "regestration success" })
      console.log(err);
    })

  } catch (error) {
    console.log(error)
    res.json("failed")
  }
})
  ;
login.post("/", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await reg_model.findOne({ email })
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Please regeister first" })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      console.log(err);
      console.log(password);

      if (!result) {
        return res.status(400).json({ "msg": "Wrong Credentials" })

      }
      return res.status(201).json({ "msg": "Login successfull!", token: jwt.sign({ id: user._id }, "masai") })
    });


  } catch (err) {
    res.status(400).json({ msg: err.message })

  }
})
Authorization.put("/:id/reset", async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newpassword } = req.body;
    const data = await reg_model.findById(id);
    console.log(data);
    console.log(password);

    const check = await bcrypt.compare(password, data.password);
    console.log(check);
    if (!check) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const newPasswordHash = await bcrypt.hash(newpassword, 10);
    const updatePassword = await reg_model.findByIdAndUpdate(id, { password: newPasswordHash });
    if(check){
      return res.status(204).json({ "msg": "Password changed successfully" });
    }
    
    
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = {Authorization,register,login}


