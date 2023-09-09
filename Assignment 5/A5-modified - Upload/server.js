const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const officeData = require("./modules/officeData.js");
const bodyParser = require('body-parser');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

// Configure the views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Configure express-handlebars
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

// Set up routes

// Step 1: Creating a simple "Employees" list & updating server.js
app.get("/employees", (req, res) => {
    officeData
        .getAllEmployees()
        .then((data) => {
            if (data.length > 0) {
                res.render("employees", { employees: data });
            } else {
                res.render("employees", { message: "No results" });
            }
        })
        .catch((error) => {
            res.render("employees", { message: "No results" });
        });
});

// Step 2: Building the Employees Table & Displaying the error "message"
// No code changes in server.js, update employees.hbs as per instructions

// Step 3: Adding body-parser in server.js
app.use(express.urlencoded({ extended: true }));

// Part 3: Adding a View, Route to Support Adding Employees

// Step 1: Adding new file in the views directory: addEmployee.html
// No code changes in server.js, create addEmployee.html as per instructions

// Step 2: Adding "Get" route "/employees/add" in server.js
app.get("/employees/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addEmployee.html"));
});

// Step 3: Adding "Post" route "/employees/add" in server.js
app.post("/employees/add", (req, res) => {
    const employeeData = req.body;
    if (!checkLastName(employeeData.lastName)) {
        // Handle the error condition here
        return;
    }
    officeData.addEmployee(employeeData)
        .then(() => {
            res.redirect("/employees");
        })
        .catch((error) => {
            // Handle the error condition here
        });
});

// Step 4: Adding "addEmployee" function within officeData.js
// Define the addEmployee function in officeData.js module as per instructions

// Part 4: adding description view & updating server.js

// Step 1: Add a file "description.hbs" in the "views" directory
// No code changes in server.js, create description.hbs as per instructions

// Step 2: Add/update your GET "/description" in server.js
app.get("/description", (req, res) => {
    res.render("description");
});

// Initialize data and start the server
officeData
    .initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server is running on port " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.log("Unable to start the server: " + err);
    });

// Helper function for Step 3: Adding a View, Route to Support Adding Employees
function checkLastName(lastName) {
    // Implement your logic to check the last name here
    // Return true if validation passes, false otherwise
}

module.exports = app;
