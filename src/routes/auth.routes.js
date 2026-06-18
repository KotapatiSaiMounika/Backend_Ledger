const express=require("express")
const router=express.Router()
const authController = require("../controllers/auth.controller")
const tokenBlockListModel = require("../models/blacklist.model")


// @route POST /api/auth/register
// @desc Register a new user
router.post("/register",authController.userRegisterController)

// @route POST /api/auth/login
// @desc Login a user
router.post("/login", authController.userLoginController)

router.post("/logout", authController.userLogoutController)



module.exports=router