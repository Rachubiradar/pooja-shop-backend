const mongoose = require('mongoose')
const poojaSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
       // require:true
    },
    lastname:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true,
       // require:true
    },
    email:{
        type:String, 
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
  age:{
  type:String
  },
  zip: {
    type: Number,
    trim: true,
  },
  add:{
    type:String
  }
},
{timestamps:true})

module.exports = mongoose.model('Pooja',poojaSchema)