const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

// authorization
router.use(function(req, res, next) {
    if (!req.session.is_logined || req.session.std_num !== req.body.std_num) {
        return res.status(403).send({message: "Session expired"});
    }
    else
        next();
})

router.post("/history", userController.getHistory)
router.post("/enroll", userController.enroll)
router.post("/cancel", userController.cancel)

module.exports = router;