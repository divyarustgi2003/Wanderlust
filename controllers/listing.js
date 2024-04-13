const Listing = require("../models/listing.js");
//Index Route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

//new Route
module.exports.renderNewForm =(req,res) => {
  res.render("listings/new.ejs");
  };

//show route
module.exports.showPage = async (req,res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path:"reviews", 
   populate: {
    path: "author"
  },
})
.populate("owner");
  if(!listing){
    req.flash("error", "Listings does not exist!");
    res.redirect("/listings")
  }
  res.render("listings/show.ejs", { listing });
  console.log(listing);
  };

//create route
module.exports.createPage = async (req,res,next) => {
 let url= req.file.path;
 let filename = req.file.filename;


 const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = {url, filename};
  await newlisting.save();
  req.flash("success", "new listing created!");
  res.redirect("/listings");
  console.log(req.file.filename);
};

//edit route
module.exports.editPage= async (req,res) => {
  let { id } = req.params;
const listing = await Listing.findById(id);
res.render("listings/edit.ejs" , { listing });

};
//update route
module.exports.UpdatePage = async (req,res) => {

  let { id } = req.params;
  if(!id){
    throw new ExpressError(400 , "Id invalid");
  }
  let listing = await Listing.findByIdAndUpdate(id , { ...req.body.listing });
  if(typeof req.file !== "undefined"){
  let url= req.file.path;
  let filename = req.file.filename;
  listing.image = {url , filename};
  await listing.save();}
  req.flash("sucess","listing updated");
  res.redirect(`/listings/${id}`);
};

//Delete Page
module.exports.deletePage = async (req,res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
};

