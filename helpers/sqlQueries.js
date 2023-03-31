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

function displayDepartments() {
    return new Promise(function(resolve,reject){
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
            reject(err);
        }
        console.table(result);
        resolve();
        
    });
});

}

function displayRoles() 
    {return new Promise(function(resolve,reject){
    db.query(`SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) {
            reject(err);
        }
        console.table(result);
        resolve();
    });
});
}

function displayAllEmployees() {
    return new Promise(function(resolve,reject){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id JOIN department ON role.department_id=department.id;`, (err, result) => {
        if (err) {
            reject(err);
        }
        console.table(result);
        resolve(result);
    });
})
}

function addEmployee(first_name, last_name, role_name, manager_name) {
    return new Promise(function(resolve,reject){
    db.query(`SELECT id FROM role WHERE title = "${role_name}";`, (err, result) => {
        if (err) {
            console.log(err);
        }
            
        var role_id = result[0].id;
        db.query(`SELECT id FROM employee WHERE CONCAT (first_name, " ", last_name) = "${manager_name}"; `,(err, result) => {
            if(err) {
                reject(err);
            }
            
            var manager_id = result[0].id;
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${first_name}", "${last_name}", "${role_id}", "${manager_id}");`, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(`Added ${first_name} ${last_name} to employee`)
                resolve();
            })
        })

        })})
   

}
function addDepartment(name) {
    db.query(`INSERT INTO department (name) VALUE ("${name}");`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Added ${title} to department`);
    })
}



function addRole(title, salary, department) {

    return new Promise(function(resolve,reject){
        db.query(`SELECT id FROM department WHERE name = "${department}";`, (err, result) => {
            if (err) {
                reject(err);
            }
                
            var department_id = result[0].id;
                      
                
                    db.query(`INSERT INTO role (title, salary, department_id) VALUE ("${title}", "${salary}", "${department_id}");`, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(`Added ${title} to roles`)
                    resolve();
                })
    
            })})

    }

/*function getDepartmentNames() {
    db.query(`SELECT name FROM department;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        return (result);
    });
*/

function getRoleNames() {
    return new Promise(function(resolve,reject){
        db.query({sql: `SELECT JSON_ARRAYAGG(title) as title FROM role;`, rowsAsArray: true}, (err, result) => {
            if (err) {
                reject(err);
            }
            var roles = [];
            result[0][0].forEach(role => roles.push(role))
            //.log(roles)
            resolve (roles);
        });
    })
   
}

function getEmployeeNames() {
    return new Promise(function(resolve,reject){
        db.query({sql: `SELECT JSON_ARRAYAGG(CONCAT(first_name, " ", last_name)) as name FROM employee;`, rowsAsArray: true}, (err, result) => {
            if (err) {
                reject(err);
            }
            var roles = [];
            result[0][0].forEach(role => roles.push(role))
            //.log(roles)
            resolve (roles);
        });
    })
   
}

function getDepartmentNames() {
    return new Promise(function(resolve,reject){
        db.query({sql: `SELECT JSON_ARRAYAGG(name) as name FROM department;`, rowsAsArray: true}, (err, result) => {
            if (err) {
                reject(err);
            }
            var roles = [];
            result[0][0].forEach(role => roles.push(role))
            //.log(roles)
            resolve (roles);
        });
    })
   
}
/*function getEmployeeNames() {
    db.query(`SELECT first_name, last_name FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        return (result);
    });
}*/

module.exports = {
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