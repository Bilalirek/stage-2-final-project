const RootURL = "http://localhost:3000/user";

function showForm(formId) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
};

function signup() {
    let createUserName = document.getElementById("create-username").value;
    let createEmail = document.getElementById("create-email").value;
    let createPw = document.getElementById("create-password").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (createUserName.trim() === "" || !isNaN(parseFloat(createUserName))) {
        return alert("Name can't be empty or a number");
    }

    else if (createEmail.trim() === "") {
        return alert("Email is required");
    }
    else if (!emailPattern.test(createEmail)) {
        return alert("Please enter a valid email address");
    }
    else if (createPw.trim().length < 4) {
        return alert("Password must be at least 4 characters long");
    }




    const url = `${RootURL}/signup`;
    axios
        .post(url, { userName: createUserName, email: createEmail, pw: createPw })
        .then((response) => {
            const customerId = response.data.customerId;
            localStorage.setItem(`customerId`, customerId);
            alert("Account created successfully")
            window.location = "http://localhost/myshop/index.html";
        })
        .catch((error) => console.error(error));
};



function signin() {
    let loginUserName = document.getElementById("login-username").value;
    let loginPw = document.getElementById("login-password").value;

    if (loginUserName.trim() === "" || !isNaN(parseFloat(loginUserName))) {
        return alert("Username can't be empty or a number");
    }
    if (loginPw.trim() === "") {
        return alert("Password is required");
    }

    const url = `${RootURL}/signin`;
    axios
        .post(url, { userName: loginUserName, pw: loginPw })
        .then((response) => {
            if (response.data.success) {
                const customerId = response.data.customerId;
                localStorage.setItem('customerId', customerId);
                window.location = "http://localhost/myshop/index.html";
            } else {
                alert("Invalid username or password");
            }
        })
        .catch((error) => console.error(error));
}


function forgotpassword() {
    const email = document.getElementById("forgot-email").value;

    if (email.trim() === "") {
        return alert("Email is required");
    }

    const url = `${RootURL}/forgotpassword`;
    axios
        .post(url, { email: email })
        .then((response) => {
            alert(response.data.message);
            showForm('reset-password-form');
        })
        .catch((error) => {
            console.error(error);
            alert(error?.response?.data?.message);
        });
}
function resetPassword() {
    const token = document.getElementById("reset-token").value;
    const newPassword = document.getElementById("new-password").value;

    if (token.trim() === "" || newPassword.trim() === "") {
        return alert("Token and new password are required");
    }

    const url = `${RootURL}/resetpassword`;
    axios
        .post(url, { token: token, newPassword: newPassword })
        .then((response) => {
            alert(response.data.message);
        })
        .catch((error) => {
            console.error(error);
            alert(error?.response?.data?.message);
        });
}


function updateAccount() {
    let updatedUserName = document.getElementById("update-username").value;
    let updatedEmail = document.getElementById("update-email").value;
    let updatedPw = document.getElementById("update-password").value;
    const customerId = localStorage.getItem("customerId"); // Retrieve customer ID from local storage
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!customerId) {
        return alert("You need to log in to update your account.");
    }

    if (updatedUserName.trim() === "" || !isNaN(parseFloat(updatedUserName))) {
        return alert("Username can't be empty or a number");
    }
    if (updatedEmail.trim() === "") {
        return alert("Email is required");
    }
    if (!emailPattern.test(updatedEmail)) {
        return alert("Please enter a valid email address");
    }
    if (updatedPw.trim().length < 4) {
        return alert("Password must be at least 4 characters long");
    }

    const url = `${RootURL}/update`;
    axios
        .post(url, { customerId, userName: updatedUserName, email: updatedEmail, pw: updatedPw })
        .then((response) => {
            if (response.data.success) {
                alert("Account updated successfully");
                window.location = "http://localhost/myshop/index.html";
            } else {
                alert("Failed to update account");
            }
        })
        .catch((error) => console.error(error));
}
function showUpdateAccountform() {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
        document.getElementById("update-account-form").style.display = 'block'
        document.getElementById("login-form").style.display = 'none'
    }
}


window.onload = function () {
    showUpdateAccountform();
};

