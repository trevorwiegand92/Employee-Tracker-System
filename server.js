const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '$kate159875321',
    database: 'employees',
});

const readEmployees = () => {
    connection.query('SELECT * from employee', (err, res) => {
    if (err) throw (err);
    console.table(res);
    connection.end();
  });
};

connection.connect((err) => {
    if (err) throw (err);
    console.log(`Connection as id ${connection.threadId}`);
    //load prompts for user.//
    readEmployees();
});