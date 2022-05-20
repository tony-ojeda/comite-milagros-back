const { Router } = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, currentUserHandler} = require('./user.controller')
const { isAuthenticated } = require('../../auth/auth.services') 
const router = Router()

//Login
//CRUD
//GET
router.get('/', getAllUsers)
router.get('/current-user',isAuthenticated(), currentUserHandler)
router.get('/:id', isAuthenticated(), getUserById)
//Post
router.post('/', createUser)
//Modify
router.put('/:id', updateUser)
//Delete
router.delete('/:id', isAuthenticated, deleteUser)


module.exports = router
