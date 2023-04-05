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



function menue() {

    inquirer.prompt(menueQuestions).then((data) => {
        // sql.getRoleNames().then((res)=>{
        //     console.log(res);
        //     roles = res;
        switch (data.menue) {
            case "View all employees":
                sql.displayAllEmployees().then(() => {
                    menue()
                });
                break;
// added line 41 amd 42
            case "Add employee":
                newEmployee();
                
                //roles = parser(sql.getRoleNames());
                break;

            // new cases should look like this
            case "View all departments":
                sql.displayDepartments().then(() => {
                    menue()
                })

                break;

            case "View all roles":
                sql.displayRoles().then(() => {
                    menue()
                });
                break;

            case "Add role":
                // write function to fill role
                newRole();
                break;

            case "Update employee role":
                // write function to fill role
                updateRole()
                

                break;

            case "Add department":
                newDepartment();

                break;
            // finish cases
        }
        //}) 
    })


}

function newEmployee() {


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

    ]
    var roleList = [];
    var employeeList = [];

    sql.getRoleNames().then(function (result) {
        roleList = result;
        sql.getEmployeeNames().then(function (result) {
            employeeList = result;
            newEmployeeQuestions.push({
                type: "list",
                message: "What's the new employee's role?",
                choices: roleList,
                name: "employee_role",

            },
                {
                    type: "list",
                    message: "Who is the new employee's manager?",
                    choices: employeeList,
                    name: "manager",

                })

            inquirer.prompt(newEmployeeQuestions).then((data) => {
                sql.addEmployee(data.first_name, data.last_name, data.employee_role, data.manager).then(() => menue());

            })
        })
    })


}

function newRole() {

    const newRoleQuestions = [

        {
            type: "input",
            message: "What is the new role?",
            name: "title",
        },

        {
            type: "input",
            message: "What is the salary",
            name: "salary",
        },

    ]
    var depList = [];
    sql.getDepartmentNames().then((results) => {
        depList = results
        newRoleQuestions.push({
            type: "list",
            message: "What department should this role be added to?",
            name: "department",
            choices: depList,
        }),
            inquirer.prompt(newRoleQuestions).then((data) => {
                sql.addRole(data.title, data.salary, data.department).then(() => { menue() });
            })

    })
}

function updateRole() {
    var roleName = [];
    var employees = [];

        sql.getRoleNames().then(function (result){
            roleName = result;
            sql.getEmployeeNames().then(function (result){
                employees = result; 

                const updateRoleQuestions = [

                    {
                        type: "list",
                        message: "Which employee's role do you want to update?",
                        choices: employees,
                        name: "employee"
                    },

                    {
                        type: "list",
                        message: "Which role do you want to assign to the employee?",
                        choices: roleName,
                        name: "role"
                    },
                ]
                inquirer.prompt(updateRoleQuestions).then((data) => {
                    sql.updateEmployeeRole(data.employee, data.role).then(() => menue());

                })
            })
        })

}

function newDepartment() {
    const newDepartmentQuestion = [{
        type:"input",
        message:"What would you like to name your new department?",
        name:"newDepartment",
    }];
  inquirer.prompt(newDepartmentQuestion).then((data)=>{
    sql.addDepartment(data.newDepartment).then(()=> menue());
  })     
}

//sql.displayDepartments()
//sql.displayRoles()
//sql.displayAllEmployees()
//sql.getEmployeeNames()
menue();