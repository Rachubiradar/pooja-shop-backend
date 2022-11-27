const Users = require('../modules/userModel')
const Rems = require('../modules/remModel')


const remcontrol ={
    add:async (req,res) =>{
        try {
            console.log("adding rem");
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const {header,about,date,time}= req.body;
            const email = user.email;
            const phone = user.phone;
            const called = false;
            const mailed = false;

            const newrem = new Rems({header,about,date,time,email,phone,called,mailed})
            await newrem.save();
            

            res.json({newrem})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    all:async(req,res) =>{
        try {
            console.log("getting rem");
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const email = user.email;
            const allrem  = await Rems.find({email})
            res.json({"rem":allrem})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    }
    ,
    del:async(req,res) =>{
        try{

        console.log(req.body.id)
       await Rems.findByIdAndDelete({"_id":req.body.id}).then((data)=> res.status(200).json({"msg":"done"})).catch((err)=>  res.status(500).json({msg: err.message}));
        }catch (err) {
        return res.status(500).json({msg: err.message})
    }


    }
}



module.exports = remcontrol