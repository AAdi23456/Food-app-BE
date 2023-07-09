const express = require("express")
const Authorization = express.Router()
const bcrypt = require("bcrypt")
const {reg_model,blacklistmodel}= require("../models/reg")
const Validate=require("../middleware/validation")
const jwt = require("jsonwebtoken")

Authorization.post("/signup", async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body);
  try {
    const userr=await reg_model.findOne({email})
    console.log(userr);
    if(userr){
      return res.status(200).json({msg:"user already exist"})
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      const datatodb = new reg_model({ name, email, password: hash })
      await datatodb.save()
      res.json({msg:"regestration success"})
      console.log(err);
    })

  } catch (error) {
    console.log(error)
    res.json("failed")
  }
})
  ;
Authorization.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await reg_model.findOne({ email })
    console.log(user);
    if(!user){
      return res.status(200).json({"msg": "Please regeister first"} )
    }
    
      bcrypt.compare(password, user.password, (err, result) => {
        console.log(err);
        console.log(password);

        if (!result) {
         return res.status(400).json({ "msg": "Wrong Credentials" })
        
        }
        return  res.status(200).json({ "msg": "Login successfull!", "token": jwt.sign({ "email": user.email }, "masai"),"name":user.name})
      });
    
    
  } catch (err) {
    res.status(400).json({ "msg": err.message })
    
  }
})
Authorization.post("/logout",Validate,async(req,res)=>{
    try {
        const {token}=req.header
        const data=new blacklistmodel({token})
        await data.save()
        return res.status(200).json({msg:"logout successfull"})
    } catch (error) {
       return res.status(500).json({ "msg": err.message })
    }
})
/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: User registration, login, and logout endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Authorization]
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authorization]
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Wrong credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Authorization]
 *     summary: User logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Logout failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */


module.exports =  Authorization


