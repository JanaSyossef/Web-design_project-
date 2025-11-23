const themeButton = document.getElementById('theme-button');
const body = document.body;
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line'; // icon to show when in dark mode

// Load previously selected theme (if any)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Apply saved theme
if (selectedTheme) {
    body.classList.toggle(darkTheme, selectedTheme === 'dark');
    themeButton.classList.toggle(iconTheme, selectedIcon === 'ri-sun-line');
}

// Function to get current theme/icon
const getCurrentTheme = () => (body.classList.contains(darkTheme) ? 'dark' : 'light');
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? 'ri-sun-line' : 'ri-moon-line');

// Toggle theme when icon is clicked
themeButton.addEventListener('click', () => {
    body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Save choice
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});