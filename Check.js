const mongoose = require('mongoose')
require('dotenv').config()

const Users =require('./modules/userModel')
const Rems = require('./modules/remModel')
var nodemailer = require('nodemailer');
const    check= async ()=>
{
    console.log('function calling');
    const reminders = await Rems.find({mailed:false})
    console.log(reminders) 
    const date_ = new Date();
    const date = date_.getTime();
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email,
          pass: process.env.Password
        },port:465,
        host:'smtp.gmail.com'
      });
    //one day number millin seconds = 86400000
    for (let i = 0;i<reminders.length;i++)
    {
        const date1 = new Date(reminders[i].date)
        if(date1.getTime()-date <86400000)
        {
            if(reminders[i].mailed!= true)
            {


              if(date1.getTime()-date <-(86400000/2))
              {
                await Rems.findByIdAndDelete({_id:reminders[i]._id});

              }
              else{
                await Rems.findByIdAndUpdate({_id:reminders[i]._id},{mailed:true}).then((res) => {console.log(reminders[i].email)
                    const data_text = '<div style="border-width: 1px;border-color: black;border: solid;background-color: rgb(106, 220, 118);text-align: center;"><h1 style="color:blue;font-weight:400;" >'+reminders[i].header+'</h1><h3>'+reminders[i].about+'</h3><h3 style="color: red;" >Date:'+reminders[i].date+'</h3><h3>Time :'+reminders[i].time+'</h3></div>';
                    var mailOptions = {
                      from: process.env.Email,
                      to: 'rachappabiradar6@gmail.com',
                      subject: reminders[i].header,
                      html: data_text
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });
                });

            }
        }
      }
        else{
            console.log("we gone check tommorw")
        }
    }
    


}
setInterval(() => {
    check()
}, 1000*20);

module.exports = {check};