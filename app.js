const express = require("express");
const app = express();
const mongoose = require("mongoose");
//let URL = "mongodb://127.0.0.1:27017/wanderLust";
const Listing = require("./models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

main()
.then((res)=> {
console.log("connection succfessful");
}).catch((err) => {
    console.log(err);
});
async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
};
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// app.get("/testListing" , async (req,res) => {
//     let sampleListing = new Listing({
//         title:"My Villa",
//         discription:"this is a lavish villa",
//         price: 12000,
//         location:"La de cruse",
//         country: "Italy",

//     });
//     await sampleListing.save();
//     console.log("new Listing added!");
//     res.send("sucessful");
// })
app.get("/",(req,res) => {
  res.send("you've entered the root route!");
})
app.listen(8080 , (req,res) => {
    console.log("its working");
})