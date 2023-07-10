const { restuarentmodel } = require("../models/restuarent")
const express = require("express")
const Crudroutes = express.Router()
const Validate = require("../middleware/validation")
const {ordersmodel}=require("../models/orders")
Crudroutes.post("/orders",Validate, async (req, res) => {
    try {
        const {
         user: userId,
          restaurantId,
          items,
          totalPrice,
          deliveryAddress,
          status
        } = req.body;
        const newOrder = new ordersmodel({
          _id: new ObjectId(),
          user: userId,
          restaurant: restaurantId,
          items,
          totalPrice,
          deliveryAddress,
          status
        });
    
       
        await newOrder.save();
    
        return res.json({ msg: 'New order created successfully', order: newOrder });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
      }
})
Crudroutes.get("/orders/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const data=await ordersmodel.findById(id)
        if(!data){
            return res.status(400).json({msg:"No order found"})
        }
        return res.status(200).json({orders:data})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
})
Crudroutes.put('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
     
      const order = await ordersmodel.findById(id);
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
     
      order.status = status;
      await order.save();
  
      return res.status(204).json({ msg: 'Order status updated successfully', order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  });
  
Crudroutes.get("/restaurants", async (req, res) => {
    try {
        const data = await restuarentmodel.find()
        console.log(data);
       
        return res.status(200).json({ msg: data })
    } catch (error) {
        return res.status(500).json(error)
    }
})

Crudroutes.get("/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params

        const data = await restuarentmodel.findById(id)
        console.log(data);
        if(!data){
            return res.status(400).json({msg:"no data found"})
        }
        return res.status(200).json({ msg: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})
Crudroutes.get("/restaurants/:id/menu", async (req, res) => {
    try {
        const { id } = req.params

        const data = await restuarentmodel.findById(id)
        return res.status(200).json({ msg: data.menu })
    } catch (error) {
        return res.status(500).json(error)
    }
})

Crudroutes.delete("/api/restaurants/:rid/menu/:mid", async (req, res) => {
    try {
        const { rid, mid } = req.params

        const data = await catmodel.findById(rid)
        if (!data) {
            return res.status(200).json({ msg: "no restaurants found " })
        }
        const menuIndex = data.menu.findIndex((menu) => menu._id.toString() === mid);
        if (menuIndex == -1) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }
        data.menu.splice(menuIndex, 1)
        await data.save()
        return res.json({ msg: 'Menu item deleted successfully' });
    } catch (error) {
        return res.status(500).json(error)
    }
})
Crudroutes.post('/restaurant/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;
        const restaurant = await restuarentmodel.findById(id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }
        const newMenu = {
            _id: new ObjectId(),
            name,
            description,
            price,
            image,
        };
        restaurant.menu.push(newMenu);
        await restaurant.save();

        return res.status(201).json({ msg: 'New menu added successfully', menu: newMenu });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = Crudroutes