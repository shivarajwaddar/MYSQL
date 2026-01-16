const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

// FIXED: changed getstudents to getStudents
router.get("/", studentController.getStudents);

router.get("/:id", studentController.getSingleStudent);
router.post("/add", studentController.addStudent);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

module.exports = router;
