const express = require("express");
const router = express.Router({mergeParams: true});
const { listingSchema,reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
//reviews page
router.post("/", async(req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
   res.redirect(`/listings/${id}`);
   
  });
  
  
  //Delete review route
 router.delete("/:reviewId", async (req,res) => {
    let{ id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  });

  module.exports = router;