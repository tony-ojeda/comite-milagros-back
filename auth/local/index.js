const { Router } = require('express');
const { verifyAccount, changePasswordHandler, loginUserHandler, currentUserHandler } = require('./local.controller')
const { isAuthenticated } = require('../auth.services');

const router = Router()


router.post('/login', loginUserHandler)
router.put('/change-password', changePasswordHandler)
router.post('/register', loginUserHandler)
router.post('/verify-email/:hash', verifyAccount)


module.exports = router
