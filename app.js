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
        rl.question("Enter Student Name: ", (name) => {
            rl.question("Enter Student Age: ", (age) => {
                const students = getStudents();
                students.push({
                    id: Number(id),
                    name,
                    age: Number(age)
                });
                saveStudents(students);
                console.log("\nStudent Added Successfully!\n");
                showMenu();
            });
        });
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

            case "1":
                addStudent();
                break;

            case "2":
                viewStudents();
                break;

            case "3":
                searchStudent();
                break;

            case "4":
                updateStudent();
                break;

            case "5":
                deleteStudent();
                break;

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
function viewStudents() {

    const students = getStudents();

    if (students.length === 0) {
        console.log("\nNo students found!\n");
    } else {
        console.log("\n===== Student List =====");

        students.forEach(student => {
            console.log(
                `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`
            );
        });

        console.log();
    }

    showMenu();
}
function searchStudent() {

    rl.question("Enter Student ID to search: ", (id) => {

        const students = getStudents();

        const student = students.find(
            student => student.id === Number(id)
        );

        if (student) {
            console.log("\nStudent Found:");
            console.log(`ID: ${student.id}`);
            console.log(`Name: ${student.name}`);
            console.log(`Age: ${student.age}\n`);
        } else {
            console.log("\nStudent Not Found!\n");
        }

        showMenu();
    });
}
function updateStudent() {

    rl.question("Enter Student ID to update: ", (id) => {

        const students = getStudents();

        const student = students.find(
            student => student.id === Number(id)
        );

        if (!student) {
            console.log("\nStudent Not Found!\n");
            return showMenu();
        }

        rl.question("Enter New Name: ", (newName) => {

            rl.question("Enter New Age: ", (newAge) => {

                student.name = newName;
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

        const updatedStudents = students.filter(
            student => student.id !== Number(id)
        );

        if (students.length === updatedStudents.length) {
            console.log("\nStudent Not Found!\n");
        } else {
            saveStudents(updatedStudents);
            console.log("\nStudent Deleted Successfully!\n");
        }

        showMenu();
    });
}
showMenu();