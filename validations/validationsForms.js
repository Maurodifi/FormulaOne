const { body, validationResult } = require('express-validator');

const formvalidationRules = [
    body("name").notEmpty().withMessage("Por favor ingrese un nombre"),
    body("lastName").notEmpty().withMessage("Por favor ingrese un apellido"),
    body("email").notEmpty().withMessage("Por favor ingrese un email")
    .isEmail().withMessage("Por favor ingrese un mail valido"),
    body("pass").notEmpty().withMessage("Por favor ingrese una contraseña")
]

module.exports = formvalidationRules;