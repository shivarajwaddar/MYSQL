const Student = require("./students");
// const identityCard = require("./identity-card");
// const department = require("./department");
const Courses = require("./course");
const studentCourse = require("./studentCourses");

// Define Associations one to one
// Student.hasOne(identityCard);
// identityCard.belongsTo(Student);

// // one to many
// department.hasMany(Student);
// Student.belongsTo(department);

// Many to many
Student.belongsToMany(Courses, {
  through: studentCourse,
  foreignKey: "studentId",
});
Courses.belongsToMany(Student, {
  through: studentCourse,
  foreignKey: "courseId",
});

// Export them so app.js can see them
module.exports = { Student, studentCourse, Courses };
