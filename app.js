const express = require("express");
const app = express();
const mongoose = require("mongoose");
//let URL = "mongodb://127.0.0.1:27017/wanderLust";
//const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate") ;
//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/reviews.js");

//session flash and passport
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const {isLoggedIn} = require("./middleware.js");
const {saveRedirectUrl} = require("./middleware.js");

//routes
const listingRoute = require("./routes/listing.js");
const reviews = require("./routes/reviews.js")
const userRoute = require("./routes/user.js");

// // app.js
// const listingRoute = require('./routes/listing');
// app.use('/listings', listingRoute);


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
const sessionOptions = {
    secret: "mySuperSecretCode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 1000, //ek hafte baad ki
        maxAge: 7 * 24 * 60 * 1000,
        httpOnly: true
    }
};

app.get("/" , (req,res) => {
    res.send("Welcome to root route for wanderlust");
});

app.use(session(sessionOptions));
app.use(flash());

//passport initialise as middleware 
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.get("/demoUser" , async (req,res) => {
//    let newUser3 = new User({
//     email:"DIvya@gmail.com",
//     username:"delta_student"
//    });

//  try{let newRegisteredUse = await User.register(newUser3, "helloworld123");
//  res.send(newRegisteredUse);}catch(err){
//     console.log(err);
//  }
// });


//in order to send the flash to out ejs tempelate we use local variable named success to parse the data!
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
    });


app.use('/listings', listingRoute);
app.use("/listings/:id/reviews",reviews);
app.use("/",userRoute);


app.listen(8080 , (req,res) => {
    console.log("its working");
});

