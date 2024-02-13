const express = require("express");
const app = express();
const mongoose = require("mongoose");
//let URL = "mongodb://127.0.0.1:27017/wanderLust";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate") ;
//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

//app.use(express.urlencoded({ extended: true }));
main()
.then((res)=> {
console.log("connection successfull");
}).catch((err) => {
    console.log(err);
});
async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
};


//index route
app.get("/",(req,res) => {
  res.send("Welcome to project Wanderlust");
})
//root route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", (req,res) => {
  res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async (req,res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
  });

  
//create route
app.post("/listings", async (req,res) => {
  // const newListing = new Listing(req.body.listing);
  //  await newListing.save();
  //   res.redirect("/listings");
  const newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
});


//edit route
app.get("/listings/:id/edit",async (req,res) => {
  let { id } = req.params;
const listing = await Listing.findById(id);
res.render("listings/edit.ejs" , { listing });
})

//update route
app.put("/listings/:id" , async (req,res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id , { ...req.body.listing });
  res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async (req,res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})





app.listen(8080 , (req,res) => {
    console.log("its working");
})


// Import necessary packages and models
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const Listing = require("./models/listing.js"); // Make sure this import is correct
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const { error } = require("console");
// app.use(express.static(path.join(__dirname, '/public')));

// // Set up middleware
// app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine('ejs', ejsMate);

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
//   .then(() => {
//     console.log("MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Define routes

// // Create route
// app.post("/listings", async (req,res) => {
//   try {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//   } catch (error) {
//     console.error("Error creating listing:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Update route
// app.put("/listings/:id" , async (req,res) => {
//   try {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id , { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
//   } catch (error) {
//     console.error("Error updating listing:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Delete route
// app.delete("/listings/:id", async (req,res) => {
//   try {
//     let { id } = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
//   } catch (error) {
//     console.error("Error deleting listing:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Show route
// app.get("/listings/:id",async (req,res) => {
//   try {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/show.ejs", { listing });
//   } catch (error) {
//     console.error("Error fetching listing:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Index route
// app.get("/listings", async (req, res) => {
//   try {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//   } catch (error) {
//     console.error("Error fetching listings:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // New route
// app.get("/listings/new", (req,res) => {
//   res.render("listings/new.ejs");
// });

// // Edit route
// app.get("/listings/:id/edit",async (req,res) => {
//   try {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs" , { listing });
//   } catch (error) {
//     console.error("Error fetching listing for edit:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Root route
// app.get("/",(req,res) => {
//   res.send("You've entered the root route!");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
