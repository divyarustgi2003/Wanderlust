const mongoose = require("mongoose");
//this will describe the schema for the collection
const Schema = mongoose.Schema;
const Review = require("./reviews.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String, // Modified to accept filename as a separate property
    url: {
      type: String,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId, 
      ref: "Review",
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  }
  
});

listingSchema.post("findOneAndDelete", async (listing) =>{
 await Review.deleteMany({_id: {$in: listing.reviews}});
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
