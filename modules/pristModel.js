const mongoose = require('mongoose')
const pristSchema = mongoose.Schema({
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
gst:{
  type:String
},
bank:{
  typeof:String
},
ifsc:{
  typeof:String
},add:{
typeof:String
},
zip: {
  type: Number,
  trim: true,
  //required: true,
}
},
{timestamps:true})

module.exports = mongoose.model('Prist',pristSchema)