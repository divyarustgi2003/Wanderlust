const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const { listingSchema,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req ,res , next) => {
    console.log(req.path, "...", req.originalUrl, ); //will show us the url we actually wanted to access
      if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to access your listing");
        return res.redirect("/login");
      }else{
      next()}
      };

    
//to create a middleware so that the original url sent obove would not get deleted by sessions
module.exports.saveRedirectUrl = (req ,res , next) => {
  // req.session.redirectUrl = req.originalUrl;
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req,res,next)=>{
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you are not the owner of the listing");
   return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async(req,res,next)=>{
  let{id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","you did not create this review");
   return res.redirect(`/listings/${id}`);
  }
  next();
}


module.exports.validateListing = (req,res,next) => {
    let { error } = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  };

module.exports.validateReview = (req,res,next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400, errMsg);
    }else{
      next();
    }
  };
  