const form = document.getElementById('registration-form');
const tableContainer = document.getElementById('table-container');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeat-password');
    let isValid = true;

    if (!isUsernameValid(username)) {
        setError('username', 'Username must be between 4 and 20 characters and cannot be admin, user, or test.');
        isValid = false;
    }

    if (!isEmailValid(email)) {
        setError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!isPasswordValid(password)) {
        setError('password', 'Password must be between 6 and 30 characters and contain at least one lowercase letter, one uppercase letter, and one number.');
        isValid = false;
    }

    if (password !== repeatPassword) {
        setError('repeat-password', 'Passwords do not match.');
        isValid = false;
    }

    if (isValid) {
        const table = document.createElement('table');
        const tableRow = table.insertRow();
        const usernameCell = tableRow.insertCell();
        const emailCell = tableRow.insertCell();
        const passwordCell = tableRow.insertCell();
        usernameCell.innerText = username;
        emailCell.innerText = email;
        passwordCell.innerText = password;
        tableContainer.appendChild(table);
    }
});

function isUsernameValid(username) {
    const restrictedUsernames = ['admin', 'user', 'test','Admin', 'User', 'Test'];
    return username.length >= 4 && username.length <= 20 && !restrictedUsernames.includes(username);
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,30}$/;
    return passwordRegex.test(password);
}

function setError(fieldId, errorMessage) {
    const errorSpan = document.getElementById(`${fieldId}-error`);
    errorSpan.innerText = errorMessage;
}

function clearErrors() {
    const errorSpans = document.querySelectorAll('.error');
    errorSpans.forEach((errorSpan) => {
        errorSpan.innerText = '';
    });
} 