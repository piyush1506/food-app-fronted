
const Food = require('../models/food');
const Order = require('../models/order');
const express = require('express');


const createFoodController = async (req, res) => {

    try {

        const {title,description,price,category,foodTags,code,isavailable,resturant,imageUrl,rating,ratingCount } = req.body;
        if (!title ||!description || !price) {
             return  res.status(500).json({
            success:false,
            message:'fill all required details',
        })
            }

        //  const isfood  = await Food.findOne({title});
        //  if(isfood){
        //     return res.status(400).json({
        //         success:false,
        //         message:'food already exists'
        //     })
        //  }   
    const food  = await Food.create({
        title,
        description,
        price,
        category,
        foodTags,
        code,
        isavailable,
        resturant,
        imageUrl,
        rating,
        ratingCount
    }) 

    res.status(201).json({
        success:true,
        message:'food created successfully',
        food
    })

        
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

const  getAllFoodController  = async(req,res)=>{
      try {
        const foods = await Food.find({});
        if(!foods){
            return res.status(404).json({
                success:false,  
                message:'no foods found'
            })
        }
        res.status(200).json({
                      success:true,
                      qunt:foods.length,
            message:'all foods fetched',
            foods
        })
        
    } catch (error) {
          return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}

const getFoodByIdController = async(req,res)=>{
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success:false,
                message:'food id is required'
            })
        }
            const food = await Food.findById(id);
            if (!food) {
                return res.status(404).json({
                    success:false,  
                    message:'food not found'
                })
            }
        res.status(200).json({
            success:true,
            message:'food fetched successfully',
            food
        })
        
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}


const updateFoodByIdController = async(req,res)=>{
    try {
        const id = req.params.id.trim();
        // const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success:false,
                message:'food id is required'
            })
        }
        const foodExists = await Food.findById(id)
        if (!foodExists) {
            return res.status(404).json({
                success:false,  
                message:'food not found'
            })
        }
            const { title,
        description,
        price,
        category,
        foodTags,
        code,
        isavailable,
        resturant,
        imageUrl,
        rating,
        ratingCount} = req.body;

            const food = await Food.findByIdAndUpdate(id,
        //          title,
        // description,
        // price,
        // category,
        // foodTags,
        // code,
        // isavailable,
        // resturant,
        // imageUrl,
        // rating,
        // ratingCount
             req.body,{new:true});
            if (!food) {
                return res.status(404).json({
                    success:false,  
                    message:'food not found'
                })
            }
            console.log('image',req.body.imageUrl)
        res.status(200).json({
            success:true,
            message:'food updated successfully',
            food
        })
        
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}



const getFoodByrestIdController = async(req,res)=>{
    try {
        const resturantid = req.params.id;
        if (!resturantid) {
            return res.status(400).json({
                success:false,
                message:'resturant id is required'
            })
        }
            const food = await Food.find({resturant:resturantid});
            if (!food) {
                return res.status(404).json({
                    success:false,  
                    message:'no food  found with this resturant id'
                })
            }
        res.status(200).json({
            success:true,
            message:'food fetched successfully',
            food
        })
        
    } catch (error) {
         return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}


const deleteFoodByIdController = async(req,res)=>{
    try {
        const id  = req.params.id;
        if (!id) {
            return res.status(400).json({
                success:false,
                message:'food id is required'
            })
        }
         const foodExists  = await Food.findById(id);
         if (!foodExists) {
            return res.status(404).json({
                success:false,  
                message:'food not found'
            })
         }
         await Food.deleteOne({_id:id});
         console.log('deleted food:',id);
         res.status(200).json({
            success:true,
            message:'food deleted successfully',
         })
        
    } catch (error) {
          return  res.status(500).json({
            success:false,
            message:error.message,
                     })
    }
}


const getResturantBydish = async (req, res) => {
  try {
    const { dish } = req.query; // ✅ read from query

    // Safety check
    if (!dish || typeof dish !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Dish name is required and must be a string'
      });
    }

    // Find foods with case-insensitive search
   const foods = await Food.find({
  title: { $regex: dish.trim(), $options: 'i' }
}).populate('resturant');

    if (!foods || foods.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant found for this dish',
      });
    }

    res.status(200).json({
      success: true,
      dish,
      results: foods
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = {
  getResturantBydish,
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  updateFoodByIdController,
  getFoodByrestIdController,
  deleteFoodByIdController
};
