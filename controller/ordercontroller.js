const express  = require('express')
const Order = require('../models/order')


const getCartdetails = async(req,res)=>{

    try {
         const id = req.userId;
         console.log(id)
         const usercart = await Order.find({buyer:id}).populate("cart")
        if (usercart.length ==0 ) {
            return res.status(404).json({
                success:false,
                message:"usercart is empty "
            })
            console.log(usercart)
        }
    
    res.status(200).json({
        success:true,
        message:'data fetched successfully',
        usercart
    })
        
    } catch (error) {
         return res.status(200).json({
        success:true,
        message:error.message
    })
    }
}

const createorderController = async(req,res)=>{
    try {
        
        const {cart,payments,buyer} = req.body
        if(!cart || !payments ){
            return res.status(400).json({
                success:false,
                message:'foods and buyer details are required'
            });
        }
        // let total = 0;
        // cart.map((i)=>{
        //     total += i.price
        // })
        const order  = await Order.create({
            cart,
            payments,
            buyer:req.userId,
            
        }) 
        res.status(201).json({
        success:true,
        message:'order created successfully',
        order
        })
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

const updateOrederStausConroller = async(req,res)=>{
    try {
        const orderid = req.params.id;
        const {status} = req.body;
        if(!orderid || !status){
            return res.status(400).json({
                success:false,
                message:'order id and status are required'
            });
        }
        const order = await Order.findByIdAndUpdate(orderid,{status},{new:true});
        if(!order){
          return  res.status(404).json({
                success:false,
                message:'order is not updated'
            })
        }
        res.status(201).json({
            success:true,
            message:'order status updated successfully'
        })
        
    } catch (error) {
           return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

module.exports ={ updateOrederStausConroller,getCartdetails,createorderController,}