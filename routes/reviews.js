const express = require("express");
const router = express.Router({mergeParams: true});
const { listingSchema,reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {isLoggedIn, isReviewAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
//reviews page
router.post("/", isLoggedIn ,validateReview,reviewController.postReview);
  
  
  //Delete review route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,reviewController.deleteReview );
  
  module.exports = router;