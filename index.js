const sql = require("./helpers/sqlQueries.js");

const inquirer = require("inquirer");

var roles = parser(sql.getRoleNames());

const menueQuestions = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "menue",
        choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Quit"]
    }
]

const newDepQuestions = [
    {
        type: "input",
        message: "What's the name of your new department?",
        name: "departmentName",

    }
]

const newEmployeeQuestions = [
    {
        type: "input",
        message: "What's the new employee's first name?",
        name: "first_name",

    },
    {
        type: "input",
        message: "What's the new employee's last name?",
        name: "last_name",

    },
    {
        type: "list",
        message: "What's the new employee's role?",
        choices: roles,
        name: "employee_role",

    },
]

function menue() {

    inquirer.prompt(menueQuestions).then((data) => {
        switch(data.menue){
            case "View all employees":
                sql.displayAllEmployees();
                break;
            case "Add employee":
                roles = parser(sql.getRoleNames());
                console.log(roles);
                inquirer.prompt (newEmployeeQuestions).then((data) => {
                    sql.addEmployee("k","k",4,4);
                })
        }
    })
}
function parser(data){
    var res=[];
        for(var i in data){
            //console.log(result[i].title)
            res.push(data[i].title)
        }
        return res;
}
//sql.displayDepartments()
//sql.displayRoles()
//sql.displayAllEmployees()
//sql.getEmployeeNames()
menue();