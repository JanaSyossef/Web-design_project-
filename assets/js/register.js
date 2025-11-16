
import { register } from "./Modules/userSystem.js";



document.addEventListener('DOMContentLoaded', () => {
  const registerClose = document.getElementById('register-close');
  const registerForm = document.querySelector('.register__form');
  const toggleIcons = document.querySelectorAll('.toggle-password');

  if (registerClose) {
    registerClose.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  toggleIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('ri-eye-off-line', 'ri-eye-line');
      } else {
        input.type = 'password';
        icon.classList.replace('ri-eye-line', 'ri-eye-off-line');
      }
    });
  });

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value.trim();
      const confirm = document.getElementById('register-confirm').value.trim();

      if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields!');
        return;
      }

      if (password !== confirm) {
        alert('Passwords do not match!');
        return;
      }

      const newUser = {
        name,
        email,
        password,
      };

      register(newUser)

      alert('Registration Successful! Welcome aboard.');

      window.location.href = 'login.html';
    });
  }
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
