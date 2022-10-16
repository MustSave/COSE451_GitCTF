const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post("/signin", controller.signin);
router.get("/logout", controller.logout);

module.exports = router;