/*********************************************************************************
* WEB322 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: _Tirth Patel_ Student ID: _172244212_ Date: _18/05/23_
*
********************************************************************************/
const officeData = require('./modules/officeData');

officeData.initialize()
  .then(() => {
    // console.log('Data initialization successful');

    officeData.getAllEmployees()
      .then(employees => {
        console.log(`Successfully retrieved ${employees.length} Employees`);
      })
      .catch(error => {
        console.log(error);
      });

    officeData.getClasses()
      .then(classes => {
        console.log(`Successfully retrieved ${classes.length} classes`);
      })
      .catch(error => {
        console.log(error);
      });

    officeData.getEAs()
      .then(EAs => {
        console.log(`Successfully retrieved ${EAs.length} EAs`);
      })
      .catch(error => {
        console.log(error);
      });

    officeData.getPartTimers()
      .then(partTimers => {
        console.log(`Successfully retrieved ${partTimers.length} Part Timers`);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });
