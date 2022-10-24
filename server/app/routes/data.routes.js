const express = require("express");
const router = express.Router();
const apiController = require("../controllers/data.controller.js")

// authorization
router.use(function(req, res, next) {
    if (req.session.is_logined === false) {
        return res.status(408).send({message: "Session expired"});
    }
    else
        next();
})

router.post("/cols", apiController.getColInfo);
router.post("/depts", apiController.getDeptInfo);
router.post("/lecs", apiController.getLecInfo);

module.exports = router;