// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console-table");

//the connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '$kate159875321',
    database: 'employees_systemDB',
});

//arrays used for filling information throughout the application.//
let departmentInfo = [];
let roleInfo = [];
let employeeInfo = [];

//this function begins the initial prompt and contains the functions to display and update information.//
const beginPrompts = () => {
    loadDepartments();
    loadRoles();
    loadAllEmployees();
    inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View all employees",
                    "View employees by department",
                    "Add employee",
                    "Update employee role",
                    "View roles",
                    "Add role",
                    "View departments",
                    "Add department",
                    "QUIT",
                ],
            },
        ])
        //goes to the selected function.//
        .then((answer) => {
            if (answer.option === "View all employees") {
                showEmployees();
            }
            if (answer.option === "View employees by department") {
                viewByDepartment();
            }
            if (answer.option === "Add employee") {
                addEmployee();
            }
            if (answer.option === "Update employee role") {
                updateEmployeeRole();
            }
            if (answer.option === "View roles") {
                showRoles();
            }
            if (answer.option === "Add role") {
                addRole();
            }
            if (answer.option === "View departments") {
                showDepartments();
            }
            if (answer.option === "Add department") {
                addDepartment();
            }
            if (answer.option === "QUIT") {
                quit();
            }
        });
};


const loadDepartments = () => {
    departmentInfo = []
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            departmentInfo.push({ name: index.name, value: index.id })
        });
    })
};

const loadRoles = () => {
    roleInfo = []
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            roleInfo.push({ name: index.title, value: index.id });
        });
    })
};

const loadAllEmployees = () => {
    employeeInfo = []
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        res.forEach(index => {
            employeeInfo.push(`${index.id} ${index.first_name} ${index.last_name}`)
        });
    })
};
//this function displays all the employees in the database.//
const showEmployees = () => {
    let queryString = `SELECT employee.id, first_name, last_name, title, salary, name AS department_name FROM employee
                       LEFT JOIN role ON role_id = role.id
                       LEFT JOIN department ON department_id = department.id`
    connection.query(queryString, (err, res) => {
        if (err) throw err;
        console.table(res);
        beginPrompts();
    });

};

const viewByDepartment = () => {
    inquirer.prompt([
            {
                name: "department",
                type: "list",
                choices: departmentInfo,
                message: 'Which department would you like to view?'
            }
        ])
        .then((answer) => {
            console.log(answer);
            let queryString =
                'SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.department_id WHERE department.id = ?';
            connection.query(queryString, answer.department, (err, res) => {
                if (err) throw err;
                console.table(res);
                beginPrompts();
            }
            );

        })
}

const addEmployee = () => {
    inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What the employee first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What the employee last name?"
            },
            {
                name: "role",
                type: "list",
                choices: roleInfo,
                message: "What is the employee role."
            },
        ])
        .then((answer) => {
            console.log(roleInfo.indexOf(answer.role));
            connection.query(
                "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
                [answer.firstName, answer.lastName, answer.role],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Done!\n`);
                }
            );
            showEmployees();
        })
};

const updateEmployeeRole = () => {
    inquirer.prompt([
            {
                name: "employee",
                type: "list",
                choices: employeeInfo,
                message: "Which employee would you like to update?",
            },
            {
                name: "role",
                type: "list",
                choices: roleInfo,
                message: "What is their new role?"
            }
        ])
        .then((answer) => {
            console.log(answer.role);
            console.log(answer.employee);
            connection.query(`UPDATE employee SET role_id = ${answer.role} WHERE id = ${answer.employee[0]}`,
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Done!\n`);
                }
            );
            showEmployees();
        });
};

const showRoles = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        // console.log(res)
        console.table(res);
        beginPrompts();
    });

};

const addRole = () => {
    inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the position?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the position?"
            },
            {
                name: "departmentID",
                type: "list",
                choices: departmentInfo,
                message: "What's the Department?",
            },
        ])
        .then((answer) => {
            connection.query(
                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                [answer.title, answer.salary, answer.departmentID],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Done!\n`);
                }
            );
            showRoles();
        });
};

const showDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        beginPrompts();
    });

};

const addDepartment = () => {
    inquirer.prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?",
            },
        ])
        .then((answer) => {
            console.log(answer);
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} Done!\n`);
                }
            );
            showDepartments();
        });
};

const quit = () => {
    connection.end();
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId} `);
    beginPrompts();
});