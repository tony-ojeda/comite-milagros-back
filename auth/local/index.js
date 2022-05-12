const { Router } = require('express');
const { verifyAccount, changePasswordHandler, loginUserHandler } = require('./local.controller')

const router = Router()


router.post('/login', loginUserHandler)
router.put('/change-password', changePasswordHandler)
router.post('/register', loginUserHandler)
router.post('/verify-email/:hash', verifyAccount)


module.exports = router
