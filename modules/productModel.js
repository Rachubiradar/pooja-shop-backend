const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
        
    },
    about:{
        type:String,
        trim:true
    },
    prize:{
        type:String,
        trim:true,
       required:true
    },
    url:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true

    }
},
    {timestamps:true})
    
    module.exports = mongoose.model('Products',productSchema)