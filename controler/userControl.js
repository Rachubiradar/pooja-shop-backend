const Users = require('../modules/userModel')
const bcrypt = require('bcrypt')
const Question= require('../modules/questionModel')

const jwt =require('jsonwebtoken')
const { use } = require('../router/userRouter')


const usercontrol ={
    
    register:async (req,res)=>{
        try{
            console.log('post')
            const {name,email,password} = req.body; 
            const user = await Users.findOne({email})
            if(user)
                 return res.status(400).json({msg:"THIS EMAIL IS ALREADY EXISTS"})
            if(password.length <6) 
                return res.status(400).json({msg:"THIS   PASSWORD IS TOO WEAK"})
            
            const passwordhash = await bcrypt.hash(password,10)
            const newuser  = new Users({
                name,email,password:passwordhash
            })
           
           // save mongodb
           await newuser.save()
           // then create jsonwebtoken to auth
           const accesstoken = createAccessToken({id:newuser._id})
          //  then create refresh token 
          const refreshtoken = createRefreshToken({id:newuser._id})
          res.cookie('refreshtoken',refreshtoken,
          {
            httpOnly:true,
            path:'/user/refresh_token'

          })
           res.json({accesstoken})
        }catch(err)
        {
            return res.status(500).json({message:err.message})
        }

    },
    refreshtoken:(req,res)=>{
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({message:"Plase Login or Register"});
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>
            {
                if(err) return res.status(400).json({message:"PLEASE LOGIN OR rEGISTER"})
                const accesstoken = createAccessToken({id:user.id})
                res.json({accesstoken })
            })
           
        }catch(err){
            return res.status(500).json({message:err.message})

        }
    },
    login:async (req,res) =>{
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({email})
            if(!user)       return res.status(400).json({msg:"THIS User don't  EXISTS"});
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password"});
            // if login success, creat access token and refresh token
            const accesstoken = createAccessToken({id:user.id})
            const refreshtoken = createRefreshToken({id:user._id})
          res.cookie('refreshtoken',refreshtoken,
          {
            httpOnly:true,
            path:'/user/refresh_token'

          })
            res.json({user,accesstoken})
        }
        catch(err)
        {
            return res.status(500).json({message:err.message})


        }
    },
    logout:(req,res) =>{
        try {
            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
            return res.json({message:"Logout"})
        } catch (error) {
            return res.status(500).json({message:error.message})

            
        }

    },
    data:async (req,res)=>{
        try{
            const user = await Users.findById(req.user.id).select('-password')//.select('-name')
            if(!user)  return res.status(400).json({message:error.message})
            res.json(user)
        }catch(error)
        {
            return res.status(500).json({message:error.message})
        }
    },
    
    anser:async (req,res)=>{
        try{
            const user = await Users.findById(req.user.id) 
            if(!user)  return res.status(400).json({message:error.message})
       await Users.findOneAndUpdate({_id:req.user.id},{
        anser:req.body.anser
       })
       const user1 = await Users.findById(req.user.id) 

            res.json(user1)

        }
        catch(error)
        {
            return res.status(500).json({message:error.message})
        }
        
    },
    result:async (req,res) =>{
        try{
            const user = await Users.findById(req.user.id) 
            if(!user)  return res.status(400).json({message:error.message})
            const question_ansers = await  Question.find()
            console.log(question_ansers)
       
            res.send({user,question_ansers})

        }
        catch(error)
        {
            return res.status(500).json({message:error.message})
        }
    }
}

const createRefreshToken =(user)=>
{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}
const createAccessToken =(user)=>
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}

module.exports = usercontrol