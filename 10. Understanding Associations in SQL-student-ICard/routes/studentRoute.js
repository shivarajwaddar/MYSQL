const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

// Changed from getStudents to getAllStudents to match your controller
router.get("/", studentController.getAllStudents);

// IMPORTANT: You haven't defined getSingleStudent in your controller yet.
// If you don't have it, comment this line out or add it to the controller.
// router.get("/:id", studentController.getSingleStudent);

router.post("/add", studentController.addStudent);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

// adding student with card
router.post(
  "/addingStudentWithCard",
  studentController.addingValuesToStudentAndIdentityTable,
);
router.post(
  "/addStudentWithDepartment",
  studentController.addStudentToDepartment,
);

module.exports = router;
