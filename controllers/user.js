const User = require("../models/user.js");
//signup page
module.exports.signUpPage = (req,res) => {
    res.render("users/signUp.ejs")
};

//post method for info from the form
//Signup
 module.exports.signUpSetup =async (req,res) => {
   try{ let {username,email,password } = req.body;
    const newUser = new User({email,username});
   const registeredUser = await User.register(newUser, password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
     // Simply call req.logout() without a callback
    req.flash("success", "You are logged in now!");
    res.redirect("/listings");
     });
     } catch(e){
    req.flash("error","not found");
    res.redirect("/signUp");
   }

};
  

//for login request
module.exports.loginPage = (req,res) => {
    res.render("users/login.ejs");
};


//post req for login with authentication via passport
//login
module.exports.loginWithPassport =  async (req,res) => {
    req.flash("success", "Wecome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
    // res.send("hello");
};


//logout route
module.exports.logOutPage =  (req,res,next) => {
    req.logout((err) => { //takes callback as parameter
        if(err){
            return next(err);
        }
     // Simply call req.logout() without a callback
    req.flash("success", "You are logged out now!");
    // res.redirect(req.session.redirectUrl);
    res.redirect("/listings");
});
};