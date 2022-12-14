const securePass = require("../helpers/securePass")
const User = require("../schemas/usersSchema");

const racers = (req, res) => {
    res.render("racers", {user: req.session.user})
};
const teams = (req, res) => {
  res.render("teams", {user: req.session.user})
};
//mostrar form de login
 function getLoginForm(req, res, next) {
    res.render("loginForm")
  };
  
//procesar form de login
async function sendLoginForm(req, res, next) {
  const { email, pass } = req.body;
  const user = await User.find().where({ email })
  if (!user.length) {
    return res.render("loginForm", { message: "Usuario o contraseña incorrectos" })
  };
  if (await securePass.decrypt(pass, user[0].password)) {
    const usr = {
    id: user[0]._id,
    name: user[0].name,
    lastName: user[0].lastName
  }
  req.session.user= usr
  res.render("home", { user: req.session.user, id: req.session.user.id })
  } else return res.render("loginForm", { message: "Usuario o contraseña incorrectos" })
  };


function getRegisterForm(req, res, next) {
    res.render("registerForm")
};

//Validaciones
const { body, validationResult } = require('express-validator'); 

//procesamos el  form de register -> Crear nuevo usuario
async function sendRegisterForm(req, res, next) {
    const { name, lastName, email, pass } = req.body
    const password = await securePass.encrypt(pass)
    const newUser = new User({
      name, lastName, email, password
    })
    const usr = {
      id: newUser._id,
      name: newUser.name,
      lastName: newUser.lastName
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formData = req.body
      const arrWarnings = errors.array();
      res.render("registerForm", {arrWarnings})
    } else {
      newUser.save();
      req.session.user = usr
      res.render("home",{ user: req.session.user, id: req.session.user.id })
    }


  };

//mostramos settings
 async function getSettings(req, res) {
  const user = await User.findById(req.session.user.id).lean()
  res.render("editUserForm", { user })
}
//procesamos el form de settings
async function sendSettings(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formData = req.body
      const arrWarnings = errors.array();
      res.render("editUserForm", {arrWarnings})
    } else {
      await User.findByIdAndUpdate(req.session.user.id, req.body)
      res.redirect("/")
    }
  } catch (err) {
    res.render("editUserForm", { message: "Ocurrió un error, intenta nuevamente" })
  }
}
//borramos un documento de la base de datos
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.session.user.id)
    req.session.destroy()
    res.redirect("/")
  } catch (err) {
    res.render("editUserForm", { message: "Ocurrió un error, intenta nuevamente" })
  }
}
//validate email
async function validateEmail(req, res) {
  res.send("email varification in database")
}

//logout
function logout(req, res) {
    req.session.destroy()
    res.redirect("/");
}
module.exports = {racers, sendLoginForm, getRegisterForm, sendRegisterForm, getLoginForm, teams, logout, deleteUser, sendSettings, getSettings, validateEmail};


