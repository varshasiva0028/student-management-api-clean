const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
app.use(express.json());
function getStudents() {
    const data = fs.readFileSync("students.json", "utf8");
    return JSON.parse(data);
}
function saveStudents(students) {
    fs.writeFileSync(
        "students.json",
        JSON.stringify(students, null, 2)
    );
}
app.get("/", (req, res) => {
    res.send("Student Management API is Running!");
});
app.get("/students", (req, res) => {
    const students = getStudents();
    res.json(students);
});
app.get("/students/:id", (req, res) => {
    const students = getStudents();
    const student = students.find(
        student => student.id === Number(req.params.id)
    );
    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }
    res.json(student);
});
app.post("/students", (req, res) => {
    const students = getStudents();
    const existingStudent = students.find(
        student => student.id === req.body.id
    );
    if (existingStudent) {
        return res.status(400).json({
            message: "Student ID Already Exists"
        });
    }
    const newStudent = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age
    };
    students.push(newStudent);
    saveStudents(students);
    res.status(201).json({
        message: "Student Added Successfully",
        student: newStudent
    });
});
app.put("/students/:id", (req, res) => {
    const students = getStudents();
    const student = students.find(
        student => student.id === Number(req.params.id)
    );
    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }
    student.name = req.body.name || student.name;
    student.age = req.body.age || student.age;
    saveStudents(students);
    res.json({
        message: "Student Updated Successfully",
        student
    });
});
app.delete("/students/:id", (req, res) => {
    const students = getStudents();
    const updatedStudents = students.filter(
        student => student.id !== Number(req.params.id)
    );
    if (students.length === updatedStudents.length) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }
    saveStudents(updatedStudents);
    res.json({
        message: "Student Deleted Successfully"
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});