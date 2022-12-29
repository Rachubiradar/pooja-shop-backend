const jwt = require('jsonwebtoken')
const Users = require('../modules/productModel')
const auth = (req,res,next)=>{
 //   console.log("auth")
    try{
        const token =req.header("Authorization")
        if(!token) return res.status(400).json({msg:"Invalid Authentication1"});
      //  console.log(token)
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
            if(err) return res.status(400).json({msg:"Invalid Authentication2"});
            req.user= user
          //
           // console.log(user)
          //
            next()
        })
    }
    catch(err)
    {
        return res.status(500).json({msg:"Invalid Authentication3"});
    }
}

module.exports = auth