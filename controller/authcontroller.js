   const User  = require('../models/usermodel')   
   const bcrypt = require('bcryptjs')      
   const jwt = require('jsonwebtoken');
const { useEffect } = require('react');

const registerController = async(req,res)=>{
   

    try {
        const {username,email,password,phone,address,answer} = req.body

        if(!username || !email || !password || !phone ||!answer){
            return res.status(500).json({
                success:false,
                message:'fill all fields'
            })
        }

            const existing = await User.findOne({email})
            console.log(existing)
            if (existing) {
              return res.status(500).json({
                success:false,
                message:'user alredy find'
            })
            }
  const hashpass = await bcrypt.hash(password,10)
             
  
            const user = await User.create({username,email,password:hashpass,address,phone,answer })
             const payload = {id: user._id}
      console.log(user)
            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'1d'
            })
            return   res.status(201).json({
                success:true,
                message:'user regiter successfuly',
                user,
                token             
            })
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:'error is register route'
        })
        
    }

}
const  loginController = async(req,res)=>{
   try {
    const  {email,password} = req.body;
    if(!email || !password)return res.status(500).json({success:false, message:'fill all details'   })
    
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json({
            success:false,
            message:'user is not found'
    })
}

    const ismatch = await bcrypt.compare(password,user.password);
    if (!ismatch) {
        return res.status(500).json({
                 success:false,
                 message:'passsword is wrong'
    })        
    }
    const payload = {id:user._id}
      console.log(user)
            const token = await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'1d'
            })
            console.log(token)


 res.status(201).json({success:true,
    message:"login sucesllly",
    user,
    token
 })
   } catch (error) {
       
   return res.status(500).json({
     success:false,
            message:error.message
    })
    }
}


module.exports = {registerController,loginController
    
}