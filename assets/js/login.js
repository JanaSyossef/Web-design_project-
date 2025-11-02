
const togglePasswordIcons = document.querySelectorAll('.toggle-password');

togglePasswordIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const targetInput = document.getElementById(icon.dataset.target);
    if (targetInput.type === 'password') {
      targetInput.type = 'text';
      icon.classList.replace('ri-eye-off-line', 'ri-eye-line');
    } else {
      targetInput.type = 'password';
      icon.classList.replace('ri-eye-line', 'ri-eye-off-line');
    }
  });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    alert('Incorrect email or password!');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));

  alert(`Welcome back, ${user.name}!`);
  window.location.href = "index.html";
});

document.getElementById('login-close').addEventListener('click', () => {
  document.getElementById('login-container').style.display = 'none';
});

document.addEventListener("mousemove", (e) => {
  const eyes = document.querySelectorAll(".eye");

  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    const rect = eye.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
    const moveRadius = 4;
    const pupilX = Math.cos(angle) * moveRadius;
    const pupilY = Math.sin(angle) * moveRadius;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
});
