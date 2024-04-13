const express = require("express");
const router = express.Router();
const passport = require("passport");
//to require user schema
const User = require("../models/user.js");
const {saveRedirectUrl}= require("../middleware.js");
const UserController = require("../controllers/user.js");

//signup page
router.get("/signUp", UserController.signUpPage);

//post method for info from the form
//Signup
router.post("/signUp",UserController.signUpSetup);
  

//for login request
router.get("/login",UserController.loginPage)

//post req for login with authentication via passport
//login
router.post("/login",
saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true,
}),
     UserController.loginWithPassport);

//logout route
router.get("/logOut", UserController.logOutPage);

module.exports = router;