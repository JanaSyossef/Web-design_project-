document.getElementById('applyFilter').addEventListener('click', () => {
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const duration = document.getElementById('durationFilter').value;

    const courses = document.querySelectorAll('.course-item-filter');

    courses.forEach(course => {
        const matchCategory = (category === 'all' || course.dataset.category === category);
        const matchPrice = (price === 'all' || course.dataset.price === price);
        const matchDuration = (duration === 'all' || course.dataset.duration === duration);

        if (matchCategory && matchPrice && matchDuration) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
});
