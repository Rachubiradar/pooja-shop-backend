const router = require('express').Router()
const questioncontrol  = require('../controler/questionControl')
const auth =require('../middleware/auth')



router.post('/add',questioncontrol.add)
router.get('/data',auth,questioncontrol.data)
router.get('/question_anser',questioncontrol.question_anser)



module.exports = router