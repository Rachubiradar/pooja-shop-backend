const router = require('express').Router()
const remControl = require('../controler/remControl')
const auth =require('../middleware/auth')
router.post('/add',auth,remControl.add)
router.get('/all',auth,remControl.all)
router.post('/del',remControl.del)

module.exports = router
