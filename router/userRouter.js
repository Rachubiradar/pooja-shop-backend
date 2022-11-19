const router = require('express').Router()
const usercontrol  = require('../controler/userControl')
const auth =require('../middleware/auth')
router.post('/register',usercontrol.register)
router.get('/refresh_token',usercontrol.refreshtoken)
router.post('/login',usercontrol.login)
router.get('/logout',usercontrol.logout)
router.get('/data',auth,usercontrol.data)


module.exports = router