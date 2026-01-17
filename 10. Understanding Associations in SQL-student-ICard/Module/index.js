const Student = require("./students");
const identityCard = require("./identity-card");
const department = require("./department");

// Define Associations one to one
Student.hasOne(identityCard);
identityCard.belongsTo(Student);

// one to many
department.hasMany(Student);
Student.belongsTo(department);

// Export them so app.js can see them
module.exports = { Student, identityCard, department };
