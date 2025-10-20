// Variables

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {number} rating
 * @property {number} price
 * @property {string} language
 * @property {string[]} tags
 * @property {string} description
 * @property {number} visits
 */

const courses = [
  {
    id: "c1",
    title: "JavaScript Basics",
    category: "Programming",
    rating: 4.7,
    language: "English",
    tags: ["js", "beginner", "web"],
    description: "Learn JS fundamentals.",
    visits: 2,
  },
  {
    id: "c2",
    title: "Advanced Web Design",
    category: "Design",
    rating: 4.9,
    language: "English",
    tags: ["design", "ui", "frontend", "web"],
    description: "Master advanced UI/UX techniques.",
    visits: 5,
  },
  {
    id: "c3",
    title: "Python for Data Science",
    category: "Programming",
    rating: 4.8,
    language: "English",
    tags: ["python", "data", "ml"],
    description: "Analyze data like a pro.",
    visits: 3,
  }
];

// Wishlist: userID → [array of courseIDs]
const wishlist = {};


// Functions

/**
 * Adds a course to the user's wishlist.
 * @param {string} userID 
 * @param {string} courseID 
 * @returns {boolean}
 */
function addToWishlist(userID, courseID) {
  if (!wishlist[userID]) wishlist[userID] = [];
  if (wishlist[userID].includes(courseID)) return false;

  wishlist[userID].push(courseID);
  return true;
}

/**
 * Removes a course from the user's wishlist.
 * @param {string} userID 
 * @param {string} courseID 
 * @returns {boolean}
 */
function removeFromWishlist(userID, courseID) {
  if (!wishlist[userID]) return false;

  const index = wishlist[userID].indexOf(courseID);
  if (index === -1) return false;

  wishlist[userID].splice(index, 1);
  return true;
}

/**
 * Returns courses sorted by visits (descending).
 * @returns {Course[]}
 */
function getTrending() {
  return [...courses].sort((a, b) => b.visits - a.visits);
}

/**
 * Filters courses based on criteria.
 * @param {object} criteria 
 * @returns {Course[]}
 */
function filterCourses(criteria) {
  return courses.filter(course => {
    return Object.entries(criteria).every(([key, value]) => {
      if (key === "minRating") return course.rating >= value;
      if (key === "maxPrice") return course.price <= value;
      return course[key] === value;
    });
  });
}

/**
 * Searches courses by keyword in title, description, or tags.
 * @param {string} keyword 
 * @returns {Course[]}
 */
function searchCourses(keyword) {
  const lower = keyword.toLowerCase();
  return courses.filter(c =>
    c.title.toLowerCase().includes(lower) ||
    c.description.toLowerCase().includes(lower) ||
    c.tags.some(tag => tag.toLowerCase().includes(lower))
  );
}

/**
 * Returns paginated courses.
 * @param {Course[]} courseList 
 * @param {number} page 
 * @param {number} limit 
 * @returns {{data: Course[], totalPages: number, currentPage: number}}
 */
function pagination(courseList, page, limit) {
  const total = courseList.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: courseList.slice(start, end),
    totalPages,
    currentPage: page
  };
}


// Testing
console.log("%cWISHLIST TEST:", "color: red;");
console.log(addToWishlist("user1", "c1"));
console.log(removeFromWishlist("user1", "c1"));

console.log("%cTRENDING TEST:", "color: red;");
console.log(getTrending());

console.log("%cFILTER TEST:", "color: red;");
console.log(filterCourses({ category: "Programming", minRating: 4.8 }));

console.log("%cSEARCH TEST:", "color: red;");
console.log(searchCourses("data"));

console.log("%cPAGINATION TEST:", "color: red;");
console.log(pagination(courses, 1, 2));
console.log(pagination(courses, 2, 2));