const sql = require("./helpers/sqlQueries.js");

const inquirer = require("inquirer");

var roles = [];

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
        choices: ["Public Relations Spec.","Public Relations Manager","Logistics Tech.","IT","Finance Spec","Finance Manager","Logistics"],
        name: "employee_role",

    },
]

function menue() {

    inquirer.prompt(menueQuestions).then((data) => {
        // sql.getRoleNames().then((res)=>{
        //     console.log(res);
        //     roles = res;
            switch(data.menue){
                case "View all employees":
                    sql.displayAllEmployees();
                    break;
                case "Add employee":
                    //roles = parser(sql.getRoleNames());
                    console.log(roles);
                    inquirer.prompt (newEmployeeQuestions).then((data) => {
                        sql.addEmployee();
                        
                    }).then(()=> menue())
                    
            }
        //}) 
    })
    
    inquirer.prompt(newDepQuestions)
}
function parser(){
   roles=[];
   console.log(sql.getRoleNames());
   var t = sql.getRoleNames();
    for(var i in t){
        console.log(t[i].title)
        roles.push(t[i].title)
    }
    //return res;
    console.log(roles);
}
//sql.displayDepartments()
//sql.displayRoles()
//sql.displayAllEmployees()
//sql.getEmployeeNames()
menue();