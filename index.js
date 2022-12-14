/* Importamos el mongo */
require("./config/mongo");
/* Declaramos todas las constantes a utilizar */
const path = require(`path`)
const { log } = require ("console");
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const auth = require("./helpers/auth");


const app = express();


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })); 

//express-hbs config
app.engine("hbs", hbs.engine({extname: "hbs"}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
/* app.use(express.static('public')); */
app.use(express.json());
//habilitamos la lectura de datos del body de la request
app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res) =>{
    res.render("home", {user: req.session.user}) ;
});
app.get("/racers", auth, (req, res) =>{
    res.render("racers", {user: req.session.user})
});
app.get("/teams", auth, (req, res) =>{
    res.render("teams", )
});
app.use("/users", require("./routes/Routes.js"));

app.listen(3000, err=>{
    !err? log(`Server Running on http://localhost:3000`):
     log(`Se rompio todo`);
});

