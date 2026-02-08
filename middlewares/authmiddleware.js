const jwt = require('jsonwebtoken');

const  authmiddleware = async(req,res,next)=>{
    try{
          
            const authorization = req.headers.authorization;
            if (!authorization) {
  return res.status(401).json({
    success: false,
    message: 'Authorization header missing'
  });
}
    

  const token = authorization.split(' ')[1];
            if(!token){return res.status(401).json({success: false, message: 'Authorization header missing' });
    }
        
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if (err) {
                return res.status(401).json({
                    success:false,
            message:err.message
                })
            }
            else{
                 req.userId = decode.id || decode._id;
                 next()
            }
        })
       

    }catch(error){
        console.error(error)
        res.status(500).json({
            message:error.message
        })    
    }
}
module.exports ={authmiddleware}