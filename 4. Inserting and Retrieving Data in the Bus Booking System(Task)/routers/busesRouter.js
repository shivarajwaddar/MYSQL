const express = require("express");
const busesController = require("../controllers/busesController");

const router = express.Router();

router.get("/available/:seats", busesController.getbuses);
router.post("/add", busesController.addbuses);

module.exports = router;
