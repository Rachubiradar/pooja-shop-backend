const router = require('express').Router()
const usercontrol  = require('../controler/userControl')
const auth =require('../middleware/auth')
router.post('/register',usercontrol.register)
router.get('/refresh_token',usercontrol.refreshtoken)
router.post('/login',usercontrol.login)
router.get('/logout',usercontrol.logout)
router.get('/all',usercontrol.all)
router.get('/infor',auth,usercontrol.getUser)
router.get('/data',auth,usercontrol.data)
router.patch('/anser',auth,usercontrol.anser)
router.get('/result',auth,usercontrol.result)
module.exports = router
//aksdhay