/*
    Todo:
    1. Ensure Price in CourseList --> ASK JANA + TONY
    2. Ensure Duration in CoruseList --> ASK JANA + TONY
    3. Ensure The Pagination Controller at the bottom of the div --> MAHMOUD
*/

// Imports
import { courseList } from "./Modules/courseSystem.js"
import { ExploreSystem } from "./Modules/ExploreSystem.js";

// References
let courses = courseList;

// Functions
function createCourseFilterItem({ title, category ,price, duration }) {
    // wrapper div
    const div = document.createElement("div");
    div.className = "course-item-filter";
    div.dataset.category = category;
    div.dataset.price = price;
    div.dataset.duration = duration;

    // image
    const img = document.createElement("img");
    img.src = "assets/img/aaa.png";
    img.alt = title;

    // title
    const h3 = document.createElement("h3");
    h3.textContent = title;

    // price
    const pPrice = document.createElement("p");
    pPrice.textContent = `Price: ${price}`;

    // duration
    const pDuration = document.createElement("p");
    pDuration.textContent = `Duration: ${duration}`;

    // button
    const button = document.createElement("button");
    button.textContent = "Visit Now";

    // append children
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(pPrice);
    div.appendChild(pDuration);
    div.appendChild(button);

    return div;
}

function renderFilteredCourses(courses, currentPage, limitPerPage){
    let paginationInfo = ExploreSystem.pagination(courses, currentPage, limitPerPage);

    const filter = document.querySelector(".courses-container-filter");

    filter.innerHTML = "";
    console.log(courses);
    console.log(filter);
    for (const course of paginationInfo.data){
    const courseInfo = {
        category: course.category,
        title: course.title,
        price: "Free",
        duration: "2 Weeks"
    };

    const divElement = createCourseFilterItem(courseInfo);

    filter.appendChild(divElement);
}
}

// Pagination
const limitPerPage = 8;
let currentPage = 1;

renderFilteredCourses(courses, currentPage, limitPerPage);

// Events
document.getElementById('applyFilter').addEventListener('click', () => {
    // Input
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const duration = document.getElementById('durationFilter').value;

    // Filteration
    const criteria = {};
    if (category !== "all") criteria.category = category;
    if (price    !== "all") criteria.price    = price;
    if (duration !== "all") criteria.duration = duration;

    const filteredCourses = ExploreSystem.filterCourses(courses, criteria);
    renderFilteredCourses(filteredCourses, currentPage, limitPerPage);
});
