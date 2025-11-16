
import { logout } from "./Modules/userSystem.js";
import { login } from "./Modules/userSystem.js";


const loginContainer = document.getElementById('login-container');
const loginIcon = document.getElementById('login-button');
const loginButton = document.getElementById('login--button');
const logoutButton = document.getElementById('logout-button');
const loginClose = document.getElementById('login-close');

logoutButton.addEventListener('click', () => {
    logout();
    alert(`Logout Successful.`);
});

loginButton.addEventListener('click', (e) => {
    const email = document.querySelector(`#popupemail`).value;
    const password = document.querySelector(`#popuppassword`).value;
    if (login(email, password)){
        alert(`Login Successful.`);
    }else{
        alert(`Login Failed! Please try again.`)
    }
});

loginIcon.addEventListener('click', () => {
    loginContainer.classList.add('active');
});

loginClose.addEventListener('click', () => {
    loginContainer.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if (e.target === loginContainer) {
        loginContainer.classList.remove('active');
    }
});

