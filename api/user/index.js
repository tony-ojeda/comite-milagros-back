const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('./user.controller')
const { isAuthenticated } = require('../../auth/auth.services') 
const router = Router()

//Login
//CRUD
//GET
router.get('/', getAllUsers)
router.get('/:id', isAuthenticated(), getUserById)
//Post
router.post('/', createUser)
//Modify
router.put('/:id', updateUser)
//Delete
router.delete('/:id', isAuthenticated, deleteUser)


module.exports = router
