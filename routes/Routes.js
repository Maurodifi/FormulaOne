const router = require('express').Router();
const users = require("../controllers/Controller");
const auth = require("../helpers/auth");


router.get("/racers", auth, users.racers);
router.get("/teams", auth, users.teams);
router.get("/login", users.getLoginForm);
router.post("/login", users.sendLoginForm);
router.get("/register", users.getRegisterForm);
router.post("/register", users.sendRegisterForm);
router.get("/logout", users.logout)
router.get("/settings", auth, users.getSettings)
router.post("/settings", auth, users.sendSettings)
router.get("/validate", auth, users.validateEmail)
router.get("/delete", auth, users.deleteUser)

module.exports = router;