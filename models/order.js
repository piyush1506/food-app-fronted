const mongoose  = require('mongoose');
const express = require('express')

const orderSchemma  = new mongoose.Schema({

    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'food'
    }],
    payments:{
        type:Number
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        enum:['preparing','prepared','delivering','delivered'],
        default:'preparing'
    }
   
},{timestamps:true})
module.exports = mongoose.model('order',orderSchemma)