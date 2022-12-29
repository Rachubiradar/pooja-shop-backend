const Users = require('../modules/pristModel')
const Products = require('../modules/poojaModel')

const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')

const shopownercontrol ={
    register:async (req,res)=>{
        console.log("register")
        try{
            console.log('post')
            const {name,lastname,phone,email,password,shopname,add,zip} = req.body; 
            const user = await Users.findOne({email})
            if(user)
                 return res.status(400).json({msg:"THIS EMAIL IS ALREADY EXISTS"})
            if(password.length <6) 
                return res.status(400).json({msg:"THIS   PASSWORD IS TOO WEAK"})
            
            const passwordhash = await bcrypt.hash(password,10)
            const newuser  = new Users({
                name,lastname,phone,email,password:passwordhash,shopname,add,zip
            })
            console.log(newuser)
           
           // save mongodb
           await newuser.save()
           // then create jsonwebtoken to auth
           const accesstoken = createAccessToken({id:newuser._id})
          //  then create refresh token 
          const refreshtoken = createRefreshToken({id:newuser._id})
          res.cookie('refreshtoken',refreshtoken,
          {
            httpOnly:true,
            path:'/user/refresh_token',
            maxAge:7*24*60*60*1000
          })
           res.json({accesstoken})
        }catch(err)
        {
            return res.status(500).json({msg:err.message})
        }

    },
    login:async (req,res) =>{
        console.log("login")
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({email})
            if(!user)       return res.status(400).json({msg:"THIS User don't  EXISTS"});
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect Password"});
            // if login success, creat access token and refresh token
            const accesstoken = createAccessToken({id:user._id})
            const refreshtoken = createRefreshToken({id:user._id})
          res.cookie('refreshtoken',refreshtoken,
          {
            httpOnly:true,
            path:'/user/refresh_token',
            maxAge:7*24*60*60*1000

          })
            res.json({accesstoken})
        }
        catch(err)
        {
            return res.status(500).json({msg:err.message})


        }
    },
    
    add:async (req,res) =>{
        console.log("add")
        try{
            const {name,about,prize,url} = await req.body;
            console.log(name)
            console.log(req.user.id)

            const shopowner  = await Users.findById({"_id":req.user.id}) 
            console.log(shopowner)
            const newproduct = new Products({name,about,prize,"email":shopowner.email,url})
            console.log(newproduct)
            await newproduct.save();
            res.json({newproduct})
       
        }
        catch(err)
        {
            return res.status(500).json({msg:err.message})


        }
    },
    redata:async (req,res) =>{
        console.log("readd")
        try{
           const {name,lastname,age,phone,gst,bank,ifsc,zip} = await req.body;
            const shopowner  = await Users.findByIdAndUpdate({"_id":req.user.id},{"name":name,"lastname":lastname,"phone":phone,"age":age,"gst":gst,"ifsc":ifsc,"bank":bank,"zip":zip}) 

            console.log(shopowner)
            shopowner.save()
            res.json({shopowner})
       
        }
        catch(err)
        {
            return res.status(500).json({msg:err.message})
        }
    },
    
    
    all:async (req,res) =>{
        console.log("add")
        try{
         
            console.log(req.user.id)

            const shopowner  = await Users.findById({"_id":req.user.id}) 
            console.log(shopowner)
            const newproduct = await Products.find({"email":shopowner.email})
            res.json({"list":newproduct})
        }
        catch(err)
        {
            return res.status(500).json({msg:err.message})


        }
    },
    refreshtoken:async (req,res)=>{
        console.log("refreshtoken")
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({message:"Plase Login or Register"});
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>
            {
                if(err) return res.status(400).json({message:"PLEASE LOGIN OR rEGISTER"})
                const accesstoken =  createAccessToken({id:user.id})
                res.json({accesstoken})
            })
           
        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },
    info:async (req,res)=>{
        console.log("infor")
        try{
         
            console.log(req.user.id)

            const user  = await Users.findById({"_id":req.user.id}) 
            
            res.json({"user":user})
        }
        catch(err)
        {
            return res.status(500).json({msg:err.message})


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

module.exports = shopownercontrol