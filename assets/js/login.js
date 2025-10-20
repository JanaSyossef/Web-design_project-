const loginContainer = document.getElementById('login-container');
const loginButton = document.getElementById('login-button');
const loginClose = document.getElementById('login-close');

loginButton.addEventListener('click', () => {
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
