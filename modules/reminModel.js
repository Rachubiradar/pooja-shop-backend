const mongoose = require('mongoose')
const reminSchema = mongoose.Schema({
    Headline:{
        type:String,
        trim:true
    },
    about:{
        type:String,
        trim:true
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
},
{timestamps:true})

module.exports = mongoose.model('Users',userSchema)