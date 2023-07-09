const { catmodel } = require("../models/store")
const express = require("express")
const Crudroutes = express.Router()
const  Validate  = require("../middleware/validation")

Crudroutes.post("/create",Validate, async (req, res) => {
    try {
        const { cat1, email, cat2, cat3 } = req.body 
        const datatodb = new catmodel({ cat1, email, cat2, cat3 })
        await datatodb.save()
        return res.status(200).json({ msg: "data saved success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
       
    }
})
Crudroutes.get("/show", Validate, async (req, res) => {
    try {
        const { email } = req.body

        const data = await catmodel.find({ email })
        return res.status(200).json({ msg: data })
    } catch (error) {
        return res.status(500).json(error)
    }
})

Crudroutes.get("/show/:id", Validate, async (req, res) => {
    try {
        const { id } = req.params

        const data = await catmodel.findById(id)
        return res.status(200).json({ msg: data })
    } catch (error) {
        return res.status(500).json(error)
    }
})
Crudroutes.delete("/delete/:id", Validate, async (req, res) => {
    try {
        const { id } = req.params

        const data = await catmodel.findByIdAndDelete(id)
        return res.status(200).json({ msg: "data deleted successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
})
Crudroutes.patch("/update/:id", Validate, async (req, res) => {
    try {
        const { id, data1 } = req.params

        const data = await catmodel.findByIdAndUpdate(id, data1)
        return res.status(200).json({ msg: "data updated successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
})
/**
 * @swagger
 * tags:
 *   name: CRUD
 *   description: API endpoints for creating, retrieving, updating, and deleting data
 */

/**
 * @swagger
 * /create:
 *   post:
 *     tags: [CRUD]
 *     summary: Create data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cat1:
 *                 type: string
 *               email:
 *                 type: string
 *               cat2:
 *                 type: string
 *               cat3:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Failed to save data
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
 * /show:
 *   get:
 *     tags: [CRUD]
 *     summary: Retrieve data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to retrieve data
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
 * /show/{id}:
 *   get:
 *     tags: [CRUD]
 *     summary: Retrieve data by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *       500:
 *         description: Failed to retrieve data
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
 * /delete/{id}:
 *   delete:
 *     tags: [CRUD]
 *     summary: Delete data by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Failed to delete data
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
 * /update/{id}:
 *   patch:
 *     tags: [CRUD]
 *     summary: Update data by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data1:
 *                 type: object
 *     responses:
 *       200:
 *         description: Data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Failed to update data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */

module.exports=Crudroutes