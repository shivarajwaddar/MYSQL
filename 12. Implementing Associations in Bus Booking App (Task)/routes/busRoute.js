const express = require("express");
const busesController = require("../controllers/busController");

const router = express.Router();

router.get("/available/:seats", busesController.getbuses);
router.post("/add", busesController.addbuses);
router.get("/:id/bookings", busesController.getBusBookings);

module.exports = router;
