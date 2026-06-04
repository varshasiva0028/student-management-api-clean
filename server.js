const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
app.use(express.json());
// read students from file
function getStudents() {
    const data = fs.readFileSync("students.json", "utf8");
    return JSON.parse(data);
}
// Save students to file
function saveStudents(students) {
    fs.writeFileSync(
        "students.json",
        JSON.stringify(students, null, 2)
    );
}

// validation
function validateStudent(id, name, age) {
    if (!Number.isInteger(id)) {
        return "ID must be a number";
    }

    if (
        typeof name !== "string" ||
        !/^[A-Za-z ]+$/.test(name.trim())
    ) {
        return "Name must contain only letters";
    }

    if (!Number.isInteger(age)) {
        return "Age must be a number";
    }

    return null;
}

// home Route
app.get("/", (req, res) => {
    res.send("Student Management API is Running!");
});

// to get all Students
app.get("/students", (req, res) => {
    const students = getStudents();
    res.json(students);
});

// to get Student By ID
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
    const { id, name, age } = req.body;
    const error = validateStudent(id, name, age);

    if (error) {
        return res.status(400).json({
            message: error
        });
    }
    const students = getStudents();
    const existingStudent = students.find(
        student => student.id === id
    );
    if (existingStudent) {
        return res.status(400).json({
            message: "Student ID Already Exists"
        });
    }
    const newStudent = { id, name, age };
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
    const { name, age } = req.body;
    if (name !== undefined) {
        if (
            typeof name !== "string" ||
            !/^[A-Za-z ]+$/.test(name.trim())
        ) {
            return res.status(400).json({
                message: "Name must contain only letters"
            });
        }
        student.name = name;
    }
    if (age !== undefined) {
        if (!Number.isInteger(age)) {
            return res.status(400).json({
                message: "Age must be a number"
            });
        }
        student.age = age;
    }
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
//to remove duplicate
app.get("/remove-duplicates", (req, res) => {
    const students = getStudents();

    const uniqueStudents = [
        ...new Map(
            students.map(student => [student.id, student])
        ).values()
    ];
    saveStudents(uniqueStudents);
    res.json({
        message: "Duplicate students removed successfully",
        students: uniqueStudents
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});