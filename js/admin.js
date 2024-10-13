let employees = JSON.parse(localStorage.getItem('employees')) || []; // Load employees from localStorage

document.getElementById('addEmployeeBtn').addEventListener('click', function() {
    document.getElementById('employeeForm').style.display = 'flex'; // Show employee modal
    clearEmployeeForm(); // Clear the employee form
});

// Close Button for Employee Modal
document.getElementById('closeEmployeeForm').addEventListener('click', function() {
    document.getElementById('employeeForm').style.display = 'none'; // Hide employee modal
});

// Add Employee Form Submission
document.getElementById('addForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('empName').value;
    const username = document.getElementById('empUsername').value;
    const password = document.getElementById('empPassword').value;
    const designation = document.getElementById('empDesignation').value;
    const salary = document.getElementById('empSalary').value;

    const newEmployee = {
        name,
        username,
        password, // Store password securely in a real application
        designation,
        salary,
        leavesTaken: 0 // Initialize leave counter
    };

    employees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(employees)); // Save employees to localStorage
    clearEmployeeForm();
    document.getElementById('employeeForm').style.display = 'none'; // Hide form after submission
});

// Function to clear the employee form fields
function clearEmployeeForm() {
    document.getElementById('empName').value = '';
    document.getElementById('empUsername').value = '';
    document.getElementById('empPassword').value = '';
    document.getElementById('empDesignation').value = '';
    document.getElementById('empSalary').value = '';
}
