const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const url = "mongodb://127.0.0.1:27017/wanderLust";
main()
.then((res) => {
    console.log("connected");
}).catch((err) => {console.log(err);});
async function main(){
    await mongoose.connect(url);
}
const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
console.log("data was initialised")
};
initDB();