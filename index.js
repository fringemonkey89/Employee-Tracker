const inquirer = require('inquirer');

const mainMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["View all departments",
                    "View all roles",
                    "View all employees",
                    "View employees by manager",
                    "View employees by department",
                    "Add department",
                    "Add role",
                    "Add employee",
                    "Update employee role",
                    "Update employee manager",
                    "Delete department",
                    "Delete role",
                    "Delete employee",
                    "View utilized budget by department",
                    "Quit"],
        default: "Quit"
    }
]

//department

const deptDet = [
    {
        type: "input",
        name: "name",
        message: "Please enter the name of this department.",
        validate: res => {
            if (!res || res.length > 30) {
                console.log(" - response must be between 1 and 30 characters");
                return false;
            }
            return true;
        }
    }
]



