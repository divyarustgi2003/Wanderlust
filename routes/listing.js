const express = require("express");
const router = express.Router();
const { listingSchema,reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {isLoggedIn} = require("../middleware.js");

//const ExpressError = require("../utils/ExpressError.js")


// const validateListing = (req,res,next) => {
//     let { error } = listingSchema.validate(req.body);
//     if(error){
//       let errMsg = error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     }else{
//       next();
//     }
//   };

//   const validateReview = (req,res,next) => {
//     let { error } = reviewSchema.validate(req.body);
//     if(error){
//       let errMsg = error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     }else{
//       next();
//     }
//   };
  
//root route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });
  
//new route
router.get("/new",(req,res) => {
  res.render("listings/new.ejs");
  });
  
  //show route
  router.get("/:id",async (req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
    });
  
    
  //create route
  router.post("/",async (req,res) => {
    // const newListing = new Listing(req.body.listing);
    //  await newListing.save();
    //   res.redirect("/");
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    req.flash("success", "new listing created!");
    res.redirect("/listings");
  });
  
  
  //edit route
  router.get("/:id/edit",isLoggedIn,async (req,res) => {
    let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs" , { listing });
  });
  
  //update route
  router.put("/:id" ,isLoggedIn, async (req,res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id , { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  });

  

  
  //delete route
router.delete("/:id",isLoggedIn, async (req,res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  });
  
  
  module.exports = router;