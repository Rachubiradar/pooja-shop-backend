const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
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
    anser:{
        type:Array,
        default:[]
    }
},
{timestamps:true})

module.exports = mongoose.model('Users',userSchema)