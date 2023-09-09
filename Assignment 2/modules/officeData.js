const fs = require('fs');

class Data {
  constructor(employees, classes) {
    this.employees = employees;
    this.classes = classes;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/employees.json', 'utf8', (err, employeeDataFromFile) => {
      if (err) {
        reject('Unable to read employees.json');
        return;
      }

      fs.readFile('./data/classes.json', 'utf8', (err, classDataFromFile) => {
        if (err) {
          reject('Unable to read classes.json');
          return;
        }

        const employees = JSON.parse(employeeDataFromFile);
        const classes = JSON.parse(classDataFromFile);

        dataCollection = new Data(employees, classes);
        resolve();
      });
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    const employees = dataCollection.employees;

    if (employees.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(employees);
  });
}

function getEAs() {
  return new Promise((resolve, reject) => {
    const employees = dataCollection.employees;
    const EAs = employees.filter(employee => employee.EA);

    if (EAs.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(EAs);
  });
}

function getClasses() {
  return new Promise((resolve, reject) => {
    const classes = dataCollection.classes;

    if (classes.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(classes);
  });
}

function getPartTimers() {
  return new Promise((resolve, reject) => {
    const employees = dataCollection.employees;
    const partTimers = employees.filter(employee => employee.status === 'Part Time');

    if (partTimers.length === 0) {
      reject('No results returned');
      return;
    }

    resolve(partTimers);
  });
}

module.exports = {
  initialize,
  getAllEmployees,
  getEAs,
  getClasses,
  getPartTimers
};
