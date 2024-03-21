const express = require("express");
const router = express.Router();
const passport = require("passport");
//to require user schema
const User = require("../models/user.js");
const {saveRedirectUrl}= require("../middleware.js");


//signup page
router.get("/signUp", (req,res) => {
    res.render("users/signUp.ejs")
});

//post method for info from the form
//Signup
router.post("/signUp",async (req,res) => {
   try{ let {username,email,password } = req.body;
    const newUser = new User({email,username});
   const registeredUser = await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
     // Simply call req.logout() without a callback
req.flash("success", "You are logged out now!");
res.redirect("/listings");
});
   } catch(e){
    req.flash("error","not found");
    res.redirect("/signUp");
   }

});
  

//for login request
router.get("/login",(req,res) => {
    res.render("users/login.ejs");
})

//post req for login with authentication via passport
//login
router.post("/login",passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: true,
}),
     async (req,res) => {
    req.flash("success", "Wecome back to Wanderlust!");
    res.redirect("/listings");
   // res.redirect(res.locals.redirectUrl) 
});

//     //logout route
//  router.get("/logOut",(req, res, next) => {
//     req.logout((err) => {
//             if(err) {
//              return next(err);
//             }
//             req.flash("success","You are logged out now!");
//             res.redirect("/listings");}
//         );
//     });
//logout route
router.get("/logOut", (req, res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
     // Simply call req.logout() without a callback
    req.flash("success", "You are logged out now!");
    res.redirect(req.session.redirectUrl);
});
});

module.exports = router;