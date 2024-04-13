const express = require("express");
const router = express.Router();
const { listingSchema,reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


const listingController  = require("../controllers/listing.js");

  //root route
  router.get("/", wrapAsync(listingController.index));
  // router.post("/", upload.single('listing[image]'), function (req, res, next) {
  //   res.send(req.file);
  //   next();
  //  });

  
  //new route
  router.get("/new",isLoggedIn,listingController.renderNewForm);

  //show route
  router.get("/:id",wrapAsync(listingController.showPage));
  
  //create route
  router.post("/",isLoggedIn, upload.single("listing[image]"),wrapAsync(listingController.createPage));
  
  //edit route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editPage));
  
  //update route
  router.put("/:id" ,isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listingController.UpdatePage));

  //delete route
  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deletePage));
  
  module.exports = router;