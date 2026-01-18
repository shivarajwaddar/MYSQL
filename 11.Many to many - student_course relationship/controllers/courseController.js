// ONLY import from index to get models WITH their associations
const { Student, Courses } = require("../Module/index");

const addCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const createdCourse = await Courses.create({ course: course });
    res.status(201).json(createdCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// {
//   "studentId": 1,
//   "courseIds": [101, 102, 105]
// }
const enrollStudentInMultipleCourses = async (req, res) => {
  try {
    const { studentId, courseIds } = req.body;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // 1. Add the courses (Sequelize handles the array automatically)
    await student.addCourses(courseIds);

    // 2. Fetch the student again with the Course data included
    const updatedStudent = await Student.findByPk(studentId, {
      include: {
        model: Courses,
        through: { attributes: [] }, // This cleans the output by hiding junction table metadata
      },
    });

    // 3. Send the full student object back
    res.status(200).json({
      message: "Enrollment successful",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export BOTH functions
module.exports = {
  addCourse,
  enrollStudentInMultipleCourses,
};
