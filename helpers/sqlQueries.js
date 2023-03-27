const mysql = require('mysql2');

const cTable = require('console.table');

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
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      });
  } 

  function displayRoles(){
    db.query(`SELECT title, role.id,  department.name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      });
  } 

  function displayAllEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id JOIN department ON role.department_id=department.id;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      });
  }

  function addEmployee(first_name, last_name, role_id, manager_id){
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${first_name}", "${last_name}", "${role_id}", "${manager_id}");`,(err, result) => {
        if (err) {
          console.log(err);
        }
        console.log (`Added ${first_name} ${last_name} to employee`)
  })
        
  }
  function addDepartment(name){
    db.query(`INSERT INTO department (name) VALUE ("${name}");`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log (`Added ${title} to department`);
      })
  }


  function addRole(title, salary, department_id){
    db.query(`INSERT INTO role (title, salary, department_id) VALUE ("${title}", "${salary}", "${department_id}");`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(`Added ${title} to roles`);
      })
  }
    
function getDepartmentNames(){
    db.query(`SELECT name FROM department;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        return(result);
      });
}

async function getRoleNames(){
    db.query(`SELECT title FROM role;`, (err, result) => {
        if (err) {
          console.log(err);
        }
        
        //result.forEach(role => roles.push(role))
        //.log(roles)
        return result;
      });
}

function getEmployeeNames(){
    db.query(`SELECT first_name, last_name FROM employee`, (err, result) => {
        if (err) {
          console.log(err);
        }
        return(result);
      });
}

  module.exports={
    displayRoles,
    displayDepartments,
    displayAllEmployees,
    getDepartmentNames,
    getEmployeeNames,
    getRoleNames,
    addDepartment,
    addRole,
    addEmployee,
  }