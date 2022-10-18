const { body, validationResult } = require('express-validator');
const formvalidationEditUser = [
    body("name").notEmpty().withMessage("Por favor ingrese un nombre"),
    body("lastName").notEmpty().withMessage("Por favor ingrese un apellido"),
    body("email").notEmpty().withMessage("Por favor ingrese un email")
]
module.exports = formvalidationEditUser;