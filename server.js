const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '$kate159875321',
    database: 'employees',
});

//load prompts function here (inquirer choices).//
//selecting a choice will go to that function.//

//also offer to view all employees.//
//view employees by department.//
//view employees by manager.//
//add employee.//
//remove employee.//
//update employee role.//
//update employee manager.//
//view role (bonus).//
//add role (bonus).//
//remove role(bonus).//
//view department (bonus).//
//add department (bonus).//
//remove department(bonus).//
//quit.//


const readEmployees = () => {
    connection.query('SELECT * from employee', (err, res) => {
    if (err) throw (err);
    console.table(res);
    connection.end();
  });
};

//view employee by department function.//
//inquirer ask what department.//
//select * from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id where department = ? //


connection.connect((err) => {
    if (err) throw (err);
    console.log(`Connection as id ${connection.threadId}`);
    //load prompts for user.//
    readEmployees();
});