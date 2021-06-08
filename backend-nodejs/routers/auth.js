const express = require('express')
const {register,getUser,login,logout} = require('../controllers/auth')
const {getAccessToRouter} = require('../middlewares/authorization/auth')

const router = express.Router()
//api/auth
router.post('/register',register)
router.get('/profile',getAccessToRouter,getUser)
router.get('/logout',getAccessToRouter,logout)
router.post('/login',login)
module.exports = router