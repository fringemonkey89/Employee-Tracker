const inquirer = require("inquirer");

const mainMenu = [
    {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
                    "View all employees",
                    "add employee",
                    "update Employee Role",
                    "View all roles",
                    "Add Role",
                    "View all Departments",
                    "Add Departments",
                    "Quit",
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

const roleDet = [
    {
        type : "input",
        name: "salary",
        message: "What is the salary for this position?",
        validate: res => {
            if (!res || res % 1 != 0) {
                console.log("a valid number is required");
                return false;
            } else {
                return true;
            }
        }
        
    },
    {
     type: "list",
     name: "dept",
     message: "which department does this role belong to?",  
     //choices: 
    },
    {
        type:"confirm",
        name: "management",
        message: "is it a managerial position?",
        default: false
    }
]

// adding an employee

const emplDet = [
    {
        type: "input",
        name: 'firstName',
        message: "please enter employees first name",
        validate: res => {
            if (!res || res.length > 30) {
                console.log("the length of th first name must be between 1 to 30 ")
                return false
            }
            return true;
        }
       
    },
    {

    },
    {

    },
]
