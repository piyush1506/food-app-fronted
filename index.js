const express  = require('express');
// const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require("cors");
const app = express();
 const mongoose = require('mongoose')
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const url = process.env.MONGO_URL

 try {
        // await mongoose.connect('mongodb+srv://ram:ram123@xchat.qfnk56h.mongodb.net/test');
        mongoose.connect(url)
        .then(()=>{
            console.log(' ✅ db is conneted'.bgBlue)
        })
        .catch((error)=>{
            console.log('error is ',error);
        })
     
        
       
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }



app.use('/api/v1/test',require('./routes/testroute'));
app.use('/api/v1/auth',require('./routes/authroutes'))
app.use('/api/v1/user',require('./routes/userroute'));
app.use('/api/v1/resturant',require('./routes/resturant'))
// app.use('/api/v1/rest',require('./routes/resturant'))

app.use('/api/v1/category',require('./routes/category'))

//order deials

app.use('/api/v1/order',require('./routes/order'))

app.use('/api/v1/food',require('./routes/foodroutes'))

app.get('/',(req,res)=>{
    res.status(201).send('<h1>ram ram dosto</h1>');
})



app.listen(8000,()=>{
    console.log('her her mahadev'.bgGreen);

})