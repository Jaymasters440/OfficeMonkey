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
    db.query(`SELECT title, role.id,  department.name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  } 

  function displayAllEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id JOIN department ON role.department_id=department.id;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  }
  function addDepartment(name){
    db.query(`INSERT INTO department (name) VALUE ("${name}");`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      })
  }
 
  module.exports={
    displayRoles,
    displayDepartments,
    displayAllEmployees,
  }