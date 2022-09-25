require("dotenv").config();
const mongoose = require("mongoose");
const URI =process.env.URI
mongoose.connect(URI, (err)=>{
    err? console.log(err) :
    console.log("mongo atlas conectedd");
})
