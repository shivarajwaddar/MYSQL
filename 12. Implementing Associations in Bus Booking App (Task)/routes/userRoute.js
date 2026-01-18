const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getuser);
router.post("/add", userController.adduser);
router.get("/:id/bookings", userController.getUserBookings);

module.exports = router;
