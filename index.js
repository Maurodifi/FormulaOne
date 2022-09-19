/* Importamos el mongo */
require("./config/mongo");
/* Declaramos todas las constantes a utilizar */
const path = require(`path`)
const { log } = require ("console");
const express = require("express");
const hbs = require("express-handlebars");

const app = express();


app.engine("hbs", hbs.engine({extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"))

app.use(express.json());
/* app.use(express.urlencoded({ extended: false}))  */

app.get("/", (req, res) =>{
    res.render("home");
})


app.listen(3000, err=>{
    !err? log(`Server Running on http://localhost:3000`):
     log(`Se rompio todo`);
});

