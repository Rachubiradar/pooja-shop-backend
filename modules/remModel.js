const mongoose = require('mongoose')
const remSchema = mongoose.Schema({
    header:{
        type:String,
        trim:true,
        require:true
        
    },
    about:{
        type:String,
        trim:true
    },
    date:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    },
    called:{
        type:Boolean,
        require:true
    },
    mailed:{
        type:Boolean,
        require:true
    }
},
    {timestamps:true})
    
    module.exports = mongoose.model('Rems',remSchema)