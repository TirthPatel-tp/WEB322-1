/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: _Tirth Patel_ Student ID: _172244212_ Date: _07/06/23_
*
********************************************************************************/ 
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var officeData = require("./modules/officeData"); // Assuming officeData.js is in the same directory

var app = express();


// GET /PartTimer
app.get("/PartTimer", (req, res) => {
  officeData.getPartTimers()
    .then((employees) => {
      if (employees.length === 0) {
        res.json({ message: "no results" });
      } else {
        res.json(employees);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// GET /employee/num
app.get("/employee/:num", (req, res) => {
  var num = req.params.num;
  officeData.getEmployeeByNum(num)
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({ message: "Employee not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET /audio
app.get("/audio", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "audio.html"));
});

// GET /video
app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "video.html"));
});

// GET /table
app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "table.html"));
});

// GET /list
app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "list.html"));
});

// [no matching route]
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start the server after initializing the data
officeData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.error("Error initializing data:", err);
  });
