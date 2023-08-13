const form = document.getElementById('user-form');
const tableContainer = document.getElementById('table-container');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const avatar = formData.get('avatar');
    const birthday = formData.get('birthday');
    const gender = formData.get('gender');
    const consent = formData.get('consent');
    let isValid = true;

    if (!isUsernameValid(username)) {
        setError('username', 'Username must be between 4 and 20 characters, cannot be admin, user, or test, and cannot contain numbers.');
        isValid = false;
    }

    if (!isAvatarValid(avatar)) {
        setError('avatar', 'Please upload a valid image file.');
        isValid = false;
    }

    if (!isBirthdayValid(birthday)) {
        setError('birthday', 'Please enter a valid birthday after January 1, 1900.');
        isValid = false;
    }

    if (!isGenderValid(gender)) {
        setError('gender', 'Please select a valid gender.');
        isValid = false;
    }

    if (!consent) {
        setError('consent', 'You must consent to the processing of your personal data.');
        isValid = false;
    }

    if (isValid) {
        const table = document.createElement('table');
        const tableRow = table.insertRow();
        const usernameCell = tableRow.insertCell();
        const avatarCell = tableRow.insertCell();
        const birthdayCell = tableRow.insertCell();
        const genderCell = tableRow.insertCell();
        usernameCell.innerText = username;
        avatarCell.innerHTML = `<img src="${URL.createObjectURL(avatar)}" alt="avatar" width="50px">`;
        birthdayCell.innerText = new Date(birthday).toLocaleDateString();
        genderCell.innerText = gender;
        tableContainer.appendChild(table);
        form.reset();
    }
});

function isUsernameValid(username) {
    const restrictedUsernames = ['admin', 'user', 'test'];
    const usernameRegex = /^[a-zA-Z]+$/;
    return username.length >= 4 && username.length <= 20 && !restrictedUsernames.includes(username.toLowerCase()) && usernameRegex.test(username);
}

function isAvatarValid(avatar) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(avatar.type);
}

function isBirthdayValid(birthday) {
    const minDate = new Date('1900-01-01');
    const inputDate = new Date(birthday);
    return inputDate.getTime() >= minDate.getTime();
}

function isGenderValid(gender) {
    return gender !== '';
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