const express = require("express");
const CourseController = require("../controllers/courseController");

const router = express.Router();

// Route to create a new course
router.post("/addcourse", CourseController.addCourse);

// Route to enroll a student in one or more courses
// You will pass { "studentId": 1, "courseIds": [1, 2, 3] } in the body
router.post("/enroll", CourseController.enrollStudentInMultipleCourses);

module.exports = router;
