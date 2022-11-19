require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')




const app = express()
app.use(cookieParser())
app.use(fileUpload({useTempFiles:true}))
app.use(express.json())
app.use(cors())

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI,  err =>{
    if(err) throw err;
    console.log('CONNECTED  TO MONGODB')
}
)

//Router
app.use('/user',require('./router/userRouter'))
app.use('/question',require('./router/questionRouter'))





app.get('/',function(req,res)
{
    res.json({msg:"welcome to server"})
})
app.listen(process.env.PORT,err=>{
    console.log('Server running')
})

 