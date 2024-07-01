// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  // Get user input to create and return an array of employee objects
  const employeeArray = [];
  while(true) {
    const employee = {
      firstName: "",
      lastName: "",
      salary: 0
    }
    //Ask user for first and last name and salary
    employee.firstName = window.prompt("Please enter your first name");
    employee.lastName = window.prompt("Please enter your last name");
    const salaryEntry = parseFloat(window.prompt("Please enter your salary"));
    //Check if salary entered is a number
    if (!isNaN(salaryEntry)) {
      employee.salary = salaryEntry;
    }

    employeeArray.push(employee);
    
    if (!window.confirm("Enter another employee?")) {
      return employeeArray;
    }
  }
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // Calculate the average salary
  var average = 0; 
  for (let i = 0; i < employeesArray.length; i++) {
    average += employeesArray[i].salary;
  }
  average /= employeesArray.length;

  // Convert average to USD style
  const dollarAverage = average.toLocaleString("en-US", {style:"currency", currency:"USD"});

  console.log("The average employee salary between our " + employeesArray.length + " employees is " + dollarAverage);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // Select and display a random employee
  const randNum = Math.floor(Math.random() * employeesArray.length)
  console.log(
  "Congratulations to " + employeesArray[randNum].firstName + " "
  + employeesArray[randNum].lastName + ", our random drawing winner!")
}


// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
