const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'CodeMonkey77&&',
      database: 'office_db'
    },
    console.log(`Connected to the office_db database.`)
  );

  function displayDepartments(){
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  } 

  function displayRoles(){
    db.query(`SELECT role.title, role.id, role.salary, department.name FROM role INNER JOIN department ON role.department_id=department.id`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  } 

  function displayEmployee(){
    db.query(`SELECT role.title, role.id, role.salary, department.name FROM role INNER JOIN department ON role.department_id=department.id`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  }
  module.exports={
    displayRoles,
    displayDepartments
  }