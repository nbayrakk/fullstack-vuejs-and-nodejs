const express = require('express')
const {register,getUser,login,logout,editUser} = require('../controllers/auth')
const {getAccessToRouter,getUserOwnerAccess} = require('../middlewares/authorization/auth')

const router = express.Router()
//api/auth
router.post('/register',register)
router.get('/profile',getAccessToRouter,getUser)
router.get('/logout',getAccessToRouter,logout)
router.post('/login',login)
router.put('/edit/:userId',[getAccessToRouter,getUserOwnerAccess],editUser)
module.exports = router