let employees = JSON.parse(localStorage.getItem('employees')) || [];
let leaveRecords = JSON.parse(localStorage.getItem('leaveRecords')) || [];
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];
let editIndex = null; // To keep track of which employee is being edited

// Add Employee Button
document.getElementById('addEmployeeBtn').addEventListener('click', function() {
    document.getElementById('employeeForm').style.display = 'flex'; // Show employee modal
    clearEmployeeForm(); // Clear the employee form
    document.getElementById('submitBtn').innerText = 'Add Employee'; // Set button text
    editIndex = null; // Reset edit index
});

// Add Complaint Button
document.getElementById('addComplaintBtn').addEventListener('click', function() {
    document.getElementById('complaintForm').style.display = 'flex'; // Show complaint modal
    clearComplaintForm(); // Clear the complaint form
});

// Close Button for Employee Modal
document.getElementById('closeEmployeeForm').addEventListener('click', function() {
    document.getElementById('employeeForm').style.display = 'none'; // Hide employee modal
});

// Close Button for Complaint Modal
document.getElementById('closeComplaintForm').addEventListener('click', function() {
    document.getElementById('complaintForm').style.display = 'none'; // Hide complaint modal
});

// Add Employee Form Submission
document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('empName').value;
    const designation = document.getElementById('empDesignation').value;
    const salary = document.getElementById('empSalary').value;

    if (editIndex !== null) {
        employees[editIndex] = {
            name,
            designation,
            salary,
            leavesTaken: employees[editIndex].leavesTaken // Keep the leave count unchanged
        };
    } else {
        const newEmployee = {
            name,
            designation,
            salary,
            leavesTaken: 0 // Initialize leave counter
        };
        employees.push(newEmployee);
    }

    localStorage.setItem('employees', JSON.stringify(employees)); // Save to localStorage
    displayEmployees(); // Call function to display employees
    clearEmployeeForm();
    document.getElementById('employeeForm').style.display = 'none'; // Hide form after submission
});

// Add Complaint Form Submission
document.getElementById('addComplaint').addEventListener('submit', function(e) {
    e.preventDefault();
    const empName = document.getElementById('complaintEmpName').value;
    const complaint = document.getElementById('complaintText').value;

    const newComplaint = {
        empName,
        complaint
    };
    complaints.push(newComplaint); // Add complaint to the array
    localStorage.setItem('complaints', JSON.stringify(complaints)); // Save to localStorage
    displayComplaints(); // Refresh the complaints table
    clearComplaintForm();
    document.getElementById('complaintForm').style.display = 'none'; // Hide form after submission
});

// Function to display employees in the table
function displayEmployees() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    employees.forEach((emp, index) => {
        const row = `<tr>
            <td>${emp.name}</td>
            <td>${emp.designation}</td>
            <td>${emp.salary}</td>
            <td>${emp.leavesTaken}</td>
            <td>
                <button onclick="editEmployee(${index})">Update</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
                <button onclick="takeLeave(${index})">Take Leave</button>
            </td>
        </tr>`;
        tbody.innerHTML += row; // Add new row
    });
}

// Function to display leave records in the leave management table
function displayLeaveRecords() {
    const tbody = document.querySelector('#leaveTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    leaveRecords.forEach(record => {
        const row = `<tr>
            <td>${record.empName}</td>
            <td>${record.date}</td>
            <td>
                <button onclick="deleteLeaveRecord('${record.date}', '${record.empName}')">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row; // Add new row
    });
}

// Function to display complaints in the table
function displayComplaints() {
    const tbody = document.querySelector('#complaintTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    complaints.forEach((comp, index) => {
        const row = `<tr>
            <td>${comp.empName}</td>
            <td>${comp.complaint}</td>
            <td>
                <button onclick="deleteComplaint(${index})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row; // Add new row
    });
}

// Function to clear the employee form fields
function clearEmployeeForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empDesignation').value = '';
    document.getElementById('empSalary').value = '';
}

// Function to clear the complaint form fields
function clearComplaintForm() {
    document.getElementById('complaintEmpName').value = '';
    document.getElementById('complaintText').value = '';
}

// Function to delete a complaint
function deleteComplaint(index) {
    complaints.splice(index, 1); // Remove complaint from the array
    localStorage.setItem('complaints', JSON.stringify(complaints)); // Update localStorage
    displayComplaints(); // Refresh the complaints table
}

// Function to delete an employee
function deleteEmployee(index) {
    employees.splice(index, 1); // Remove employee from the array
    localStorage.setItem('employees', JSON.stringify(employees)); // Update localStorage
    displayEmployees(); // Refresh the employees table
}

// Function to edit an employee
function editEmployee(index) {
    const emp = employees[index];
    document.getElementById('empName').value = emp.name;
    document.getElementById('empDesignation').value = emp.designation;
    document.getElementById('empSalary').value = emp.salary;
    document.getElementById('employeeForm').style.display = 'flex'; // Show employee modal
    editIndex = index; // Set edit index
    document.getElementById('submitBtn').innerText = 'Update Employee'; // Change button text
}

// Function to take leave
function takeLeave(index) {
    const emp = employees[index];
    const leaveDate = new Date().toLocaleDateString(); // Get current date

    // Increment leaves taken and create leave record
    emp.leavesTaken += 1;
    leaveRecords.push({
        empName: emp.name,
        date: leaveDate
    });

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('leaveRecords', JSON.stringify(leaveRecords));

    displayEmployees(); // Refresh the employee table
    displayLeaveRecords(); // Refresh the leave records table
}

// Function to delete a leave record
function deleteLeaveRecord(date, empName) {
    leaveRecords = leaveRecords.filter(record => record.date !== date || record.empName !== empName); // Remove the specific leave record
    localStorage.setItem('leaveRecords', JSON.stringify(leaveRecords)); // Update localStorage
    displayLeaveRecords(); // Refresh the leave records table
}

// Initially hide the employee and complaint forms
document.getElementById('employeeForm').style.display = 'none';
document.getElementById('complaintForm').style.display = 'none';

// Display employees, complaints, and leave records on page load
displayEmployees();
displayComplaints();
displayLeaveRecords();
