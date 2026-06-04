const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
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

function addStudent() {
    rl.question("Enter Student ID: ", (id) => {

        if (isNaN(id) || id.trim() === "") {
            console.log("\nID must be a number!\n");
            return showMenu();
        }

        rl.question("Enter Student Name: ", (name) => {

            if (!/^[A-Za-z ]+$/.test(name.trim())) {
                console.log("\nName must contain only letters!\n");
                return showMenu();
            }

            rl.question("Enter Student Age: ", (age) => {

                if (isNaN(age) || age.trim() === "") {
                    console.log("\n Age must be a number!\n");
                    return showMenu();
                }

                const students = getStudents();

                const exists = students.find(
                    s => s.id === Number(id)
                );

                if (exists) {
                    console.log("\n Student ID already exists!\n");
                    return showMenu();
                }

                students.push({
                    id: Number(id),
                    name: name.trim(),
                    age: Number(age)
                });

                saveStudents(students);

                console.log("\n Student Added Successfully!\n");
                showMenu();
            });
        });
    });
}
function viewStudents() {
    const students = getStudents();

    if (students.length === 0) {
        console.log("\n❌ No students found!\n");
    } else {
        console.log("\n===== STUDENT LIST =====");
        students.forEach(s => {
            console.log(`ID: ${s.id}, Name: ${s.name}, Age: ${s.age}`);
        });
        console.log();
    }
    showMenu();
}
function searchStudent() {
    rl.question("Enter Student ID to search: ", (id) => {

        const students = getStudents();

        const student = students.find(
            s => s.id === Number(id)
        );

        if (!student) {
            console.log(" Student Not Found!");
        } else {
            console.log("\n Student Found:");
            console.log(`ID: ${student.id}`);
            console.log(`Name: ${student.name}`);
            console.log(`Age: ${student.age}\n`);
        }

        showMenu();
    });
}
function updateStudent() {
    rl.question("Enter Student ID to update: ", (id) => {

        const students = getStudents();

        const student = students.find(
            s => s.id === Number(id)
        );

        if (!student) {
            console.log("\n Student Not Found!\n");
            return showMenu();
        }

        rl.question("Enter New Name: ", (newName) => {

            if (!/^[A-Za-z ]+$/.test(newName.trim())) {
                console.log("\n Name must contain only letters!\n");
                return showMenu();
            }
            rl.question("Enter New Age: ", (newAge) => {

                if (isNaN(newAge) || newAge.trim() === "") {
                    console.log("\n Age must be a number!\n");
                    return showMenu();
                }

                student.name = newName.trim();
                student.age = Number(newAge);

                saveStudents(students);

                console.log("\nStudent Updated Successfully!\n");
                showMenu();
            });
        });
    });
}
function deleteStudent() {
    rl.question("Enter Student ID to delete: ", (id) => {

        const students = getStudents();

        const updated = students.filter(
            s => s.id !== Number(id)
        );

        if (students.length === updated.length) {
            console.log("\nStudent Not Found!\n");
        } else {
            saveStudents(updated);
            console.log("\nStudent Deleted Successfully!\n");
        }

        showMenu();
    });
}

function showMenu() {
    console.log("\n===== Student Management System =====");
    console.log("1. Add Student");
    console.log("2. View Students");
    console.log("3. Search Student");
    console.log("4. Update Student");
    console.log("5. Delete Student");
    console.log("6. Exit");

    rl.question("Choose an option: ", (choice) => {

        switch (choice) {
            case "1": addStudent(); break;
            case "2": viewStudents(); break;
            case "3": searchStudent(); break;
            case "4": updateStudent(); break;
            case "5": deleteStudent(); break;
            case "6":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid Choice!");
                showMenu();
        }
    });
}
showMenu();