const router = require('express').Router();
const users = require("../controllers/Controller");

router.get("/racers", users.racers);
router.get("/login", users.getLoginForm);
router.post("/login", users.sendLoginForm);

module.exports = router;