// Load current employee from sessionStorage
const currentEmployee = JSON.parse(sessionStorage.getItem('currentEmployee'));

if (!currentEmployee) {
    window.location.href = 'login.html'; // Redirect to login if not logged in
}

// Display employee information
document.getElementById('employeeInfo').innerHTML = `
    <p>Name: ${currentEmployee.name}</p>
    <p>Designation: ${currentEmployee.designation}</p>
    <p>Salary: ${currentEmployee.salary}</p>
    <p>Leaves Taken This Week: ${currentEmployee.leavesTaken}</p>
`;

// Sample Work Progress Data (this can be updated to fetch real data)
let workProgress = [
    { task: 'Project A', progress: '50%' },
    { task: 'Project B', progress: '80%' },
    { task: 'Internal Review', progress: '30%' }
];

// Display Work Progress for the current employee
function displayWorkProgress() {
    const progressTable = document.getElementById('workProgressTable');
    workProgress.forEach(prog => {
        const row = `<tr>
            <td>${prog.task}</td>
            <td>${prog.progress}</td>
        </tr>`;
        progressTable.innerHTML += row;
    });
}

// Function to update leaves per week
function displayLeavesTaken() {
    document.getElementById('leavesTaken').innerHTML = `${currentEmployee.leavesTaken}`;
}

// Load complaints for the current employee
let complaints = JSON.parse(localStorage.getItem('complaints')) || [];

// Display complaints for the current employee
function displayComplaints() {
    const tbody = document.querySelector('#complaintTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    complaints.forEach((comp, index) => {
        if (comp.empName === currentEmployee.name) { // Check if complaint belongs to the current employee
            const row = `<tr>
                <td>${comp.complaint}</td>
                <td>
                    <button onclick="deleteComplaint(${index})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row; // Add new row
        }
    });
}

// Function to delete a complaint
function deleteComplaint(index) {
    complaints.splice(index, 1); // Remove complaint from the array
    localStorage.setItem('complaints', JSON.stringify(complaints)); // Update localStorage
    displayComplaints(); // Refresh the complaints table
}

// Call display functions
displayWorkProgress();
displayComplaints();
displayLeavesTaken();
