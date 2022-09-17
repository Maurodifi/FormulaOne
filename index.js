require("./config/mongo");
const { log } = require ("console");
const express = require("express");
const app = express();
app.listen(3000, err=>{
    !err? log(`Server Running on http://localhost:3000`):
     log(`Se rompio todo`);
});

app.get("/", (req, res, next) =>{
    res.send("Holis, estamos con MongoDB")
})