const Question = require('../modules/questionModel')
const User = require('../modules/userModel')

const bcrypt = require('bcrypt')

const jwt =require('jsonwebtoken')


const questioncontrol ={
    
    add:async (req,res)=>{
        try{
            console.log('post')
            const {question,op1,op2,op3,op4,anser} = req.body; 
            const user = await Question.findOne({question})
            if(user)
                 return res.status(400).json({msg:"THIS question  IS ALREADY EXISTS"})
              
            const newquestion  = new Question({question,op1,op2,op3,op4,anser})
           
           // save mongodb
           await newquestion.save()
           // then create jsonwebtoken to auth
          //  then create refresh token 
       
           res.json({message:"added the question"})
        }catch(err)
        {
            return res.status(500).json({message:err.message})
        }

    },
    data:async (req,res)=>{
        console.log(req.user)
        try{
            console.log("try")
            const user = await User.findById(req.user.id).select('-password')//.select('-name')
            if(!user)  return res.status(400).json({message:error.message})
            console.log(user)
            const question = await  Question.find().select('-createdAt').select('-updatedAt').select('-__v').select('-anser')
            console.log(question)
            res.json({user,question})
        }catch(error)
        {
            return res.status(500).json({message:error.message})
        }
    },
    question_anser:async (req,res)=>{
        try{
            const question_ansers = await  Question.find().select('-createdAt').select('-updatedAt').select('-__v')
            res.json(question_ansers)     
        }catch(error)
        {
            return res.status(500).json({message:error.message})
        }
    }
}



module.exports = questioncontrol