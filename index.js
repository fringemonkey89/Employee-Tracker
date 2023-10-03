const {inquirer} = import ("inquirer");

const db = require('./db');
require("console.table");

init();

function init() {
    runPrompts();
}

function runPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "what would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    NAME: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        switch(choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENTS":
                createDepartments();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    })
}

function viewAllEmployees() {
    db.allEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.tables(employees);
    })
    .then(() => runPrompts())
}

function viewAllRoles() {
    db.allRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log('\n');
        console.table(departments);
    })
    .then(() => runPrompts());
}

function createRole() {
    db.allDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({id, name}) ({
            name: name,
            value: id
        }));
        prompt([
            {
                name: "title",
                message: "what is the name of the role?"
            },
            {
                name: "title",
                message: "what is the salary rate?"
            },
            {
                type: "list",
                name: "department_id",
                message: "which department does the role fall under?",
                choices: departmentChoices
            }
        ])
        .then(role => {
            db.addRole(role)
            .then(() => console.log(`added ${role.title}`))
            .then(() => runPrompts());
        })
    })
}

function createDepartment() {
    prompt([
        {
            name: "name",
            message: "what is the name of the department"
        }
    ])
    .then(res => {
        let name = res;
        db.addDepartment(name)
        .then(() => console.log(`added ${name.name} to the database`))
        .then(() => runPrompts())
    })
}

function createEmployee() {
    prompt([
        {
            name: 'first_name',
            message: 'whats the employees first name?'
        },
        {
            name: 'last_name',
            message: 'whats the employees last name?'
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title}) => ({
                name: title,
                value: id
            }));

            prompt({
                type: 'list',
                name: 'roleId',
                message: 'whats the employees role?',
                choices: roleChoices
            })
            .then(res => {
                let roleId = res.roleId;

                db.allEmployees()
                    .then(([rows]) => {
                        let employees = rows;
                        const managerChoices = employees.map(({ id, firs_name, last_name}) =>({
                            name: `${first_name} ${last_name}`,
                            value: id    
                        }));
                        managerChoices.unshift({ name: 'none', value: null});

                        prompt({
                            type: 'list',
                            name: 'managerId',
                            message: 'who is the employees manager?',
                            choices: managerChoices
                        })
                        .then(res => {
                            let employee = {
                                manager_id: res.managerId,
                                role_id: roleId,
                                first_name: firstName,
                                last_name: lastName
                            }
                            db.addEmployee(employee);    
                        })
                        .then(() => console.log(
                            `added ${firstName} ${lastName}`
                        ))
                        .then(() => runPrompts())
                    })
                })
            })
        })
    }

    function updateEmployeeRole() {
        db.allEmployees()
            .then(([rows]) => {
                let employees = row;
                const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which employee's role do you want to update?",
                        choices: employeeChoices
                    }
                ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id    
                }));

                prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "What's the new role of this employee?",
                        choices: roleChoices
                    }
                ])
                    .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                    .then(() => console.log("Employee's role is updated"))
                    .then(() => runPrompts())
                });
            });

        })
    }

function quit() {
    process.exit();
}   