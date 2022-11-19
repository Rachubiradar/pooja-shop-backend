const mongoose = require('mongoose')
const questionSchema = mongoose.Schema({
    question:{
        type:String,
        trim:true,
        unique:true,
        require:true,
    },
    op1:{
        type:String, 
        require:true,
    },
    op2:{
        type:String, 
        require:true,
    },
    op3:{
        type:String, 
        require:true,
    },
    op4:{
        type:String, 
        require:true,
    },
    anser:{
        type:String, 
        require:true,
    }
},
{timestamps:true})

module.exports = mongoose.model('Question',questionSchema)