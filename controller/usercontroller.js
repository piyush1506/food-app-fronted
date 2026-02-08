const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')

// app.use(express.json());
const getUserController = async(req,res)=>{

     const id = req.userId
     console.log('id is',id)
     const user = await User.findById(id) 
     console.log( 'user id is',user)
     user.password = undefined
    res.status(200).json({
         success:true,
         message:'User registered successfully',
         user      
    })
}

     const updateUserController = async(req,res)=>{

          try {
               const id = req.userId
               const user = await User.findById(id)
               if (!user) {
                    return res.status(404).json({
                         success:false,
                         message:'user not found'
                    })
               }
               const {username,address,phone} = req.body;
               if (username) user.username = username
               if( address)  user.address = address
               if(phone) user.phone = phone     
               await user.save();
               res.status(200).json({
                     success:true,
                         message:'user updated successfully'       
               })       
               
               console.log(user)
          } catch (error) {
               res.status(500).json({
                    success:false,
                    message:'Error In update user api'
               })
          }

     }

   const updatepassController = async (req, res) => {

     try {
          const { oldpassword, newpassword } = req.body;
          if (!oldpassword || !newpassword) {
               return res.status(400).json({
                    success:false,
                    message:'fill all details'
               })
          }
          const id = req.userId;
          const user = await User.findById(id);
           if (!user) {
                    return res.status(404).json({
                         success:false,
                         message:'user not found'
                    })
               }
             const ismatch = await bcrypt.compare(oldpassword,user.password)
                    
               console.log(ismatch)
     if (!ismatch) {
               return res.status(401).json({
                    success:false,
                    message:'old password is incorrect'
               })
     }
 const hashpass = await bcrypt.hash(newpassword,10);
          user.password = hashpass;
          await user.save();
          res.status(200).json({
               success:true,
               message:'password updated successfully'
          })
     } catch (error) {
            return res.status(404).json({
    success: false,
    message: error.message
  });
     }



};
     const resetpassController = async(req,res)=>{
          try {

               const {email,newpassword,answer} = req.body;
               if (!email || !newpassword || !answer) {
                    return res.status(400).json({
                         success:false,
                         message:'fill all details'
                    })
               }
               
               const user = await User.findOne({email,answer});
               if(!user)
               {return res.status(404).json({ success:false,
                         message:'fill all details'})}


const hashpass = await bcrypt.hash(newpassword,10)
user.password = hashpass;
console.log('CONTROLLER HIT');

await user.save();
res.status(200).json({
     success:true,
     message:'password reset successfully'
})
 

          } catch (error) {
               res.status(500).json({
                    success:false,
                    message:'error in password reset api',
                    error
               })
          }

     }

     const deleteUserController = async(req,res)=>{
          try {
               const {id} = req.params;
         const deleteuser = await User.findByIdAndDelete({_id:id});
         if(!deleteuser){
              return res.status(404).json({
                   success:false,
                   message:'user not found'
              })
         }
              res.status(200).json({
                success:true,
                message:'user deleted successfully',
                deleteuser

             })

               
          } catch (error) {
                               res.status(500).json({
                    success:false,
                    message:'error in delete user api',
                    error
               })
          }
     }

module.exports = {getUserController,updateUserController,resetpassController,updatepassController,deleteUserController}
