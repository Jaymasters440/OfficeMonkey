const sql= require("./helpers/sqlQueries.js");

const menueQuestions=[
    {
        type:"list",
        message:"What would you like to do?",
        name: "menue",
        choices: ["View all employees","Add employee","Update employee role","View all roles","Add role","View all departments","Add department","Quit"]
    }
]

const nepDepQuestions=[
    {
        type:"input",
        message:"What's the name of your new department?",
        name: "departmentName",
        
    }
]

sql.displayDepartments()
sql.displayRoles()
sql.displayAllEmployees()