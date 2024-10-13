// login.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validating user credentials
   
    if (email === "purandhar@gmail.com" && password === "admin") {
        window.location.href = 'dashboard.html'; // Redirect to admin dashboard
    } else if (email === "sashank@gmail.com" && password === "employee") {
        window.location.href = 'employee_dashboard.html'; // Redirect to employee dashboard
    } else {
        document.getElementById('error-message').textContent = "Invalid Credentials";
    }

});
