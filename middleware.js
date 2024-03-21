
    const isLoggedIn = (req, res, next) => {
      console.log("Inside isLoggedIn middleware");
      console.log("req.isAuthenticated():", req.isAuthenticated());
    
      if (req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        console.log("Redirecting to:", req.session.redirectUrl);
        return next();
      }
    
      console.log("User not authenticated, redirecting to /login");
      req.flash("error", "You must be logged in to do that");
      res.redirect("/login");
    };
    
    module.exports = {
      isLoggedIn
    };
    

module.exports = {
  isLoggedIn
};

module.exports.saveRedirectUrl = (req ,res , next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
