const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getuser);
router.post("/add", userController.adduser);
router.delete("/delete/:id", userController.deleteuser);
router.put("/update/:id", userController.updateuser);

module.exports = router;
