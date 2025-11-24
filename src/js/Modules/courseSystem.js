// Course System module:
// createCourse, editCourse, deleteCourse, getCourse, listCourses, getAnalytics, enrollUser, searchCoursesByCategory, incrementVisits

import { cleanupCourseData } from './progressSystem.js'; // Function to remove user related data (progress/certificates)
import { listUsers, updateUser } from "./userSystem.js"

const STORAGE_KEY_COURSES = "cp_courses_v1";

/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} instructor
 * @property {Array<Array>} students - array of [userId, dateEnrolled]
 * @property {Array<string>} categories
 * @property {number} visits
 * @property {number} price
 * @property {string} duration
 */

export let courseList = loadCourses() || [
  {
    id: 1,
    title: "Multimedia Basics",
    description: "Intro to multimedia",
    instructor: "Jana",
    students: [],
    categories: ["multimedia", "basics"],
    visits: 0,
    price: 200,
    duration: "3 Weeks"
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Basics of GD",
    instructor: "Sama",
    students: [],
    categories: ["graphic", "design"], 
    visits: 0,
    price: 250,
    duration: "4 Weeks"
  }
];

/**
 * Load courses from localStorage
 * @returns {Course[]}
 */
function loadCourses() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_COURSES)) || []; } catch (e) { return []; }
}

/**
 * Save courses to localStorage
 */
function saveCourses() {
  try { localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courseList)); } catch (e) { /*ignore*/ }
}

/**
 * Find index of a course by ID
 * @param {number} id
 * @returns {number} index or -1 if not found
 */
function _findCourseIndex(id) {
  return courseList.findIndex(c => c.id === id);
}

/**
 * Generate a unique ID for new course
 * @returns {number}
 */
function _generateUniqueCourseId() {
  if (courseList.length === 0) return 1;
  const maxId = Math.max(...courseList.map(c => c.id));
  return maxId + 1;
}

/**
 * Create a new course
 * @param {Partial<Course>} course - course data (title is required)
 * @returns {Course|null} created course or null if invalid
 */
export function createCourse(course) {
  if (!course || !course.title) return null;
  const newId = _generateUniqueCourseId(); 
  const newCourse = {
    ...course,
    id: newId,
    students: course.students || [],
    categories: course.categories || [],
    visits: course.visits || 0,
    price: course.price || 0,
    duration: course.duration || "N/A"
  };
  courseList.push(newCourse);
  saveCourses();
  return newCourse;
}

/**
 * Edit existing course
 * @param {number} id
 * @param {Partial<Course>} data
 * @returns {Course|null} updated course or null if not found
 */
export function editCourse(id, data) {
  const idx = _findCourseIndex(id);
  if (idx === -1) return null;

  if (data.categories) {
    data.categories = Array.isArray(data.categories) ? data.categories : [];
    const oldCategories = courseList[idx].categories || [];
    data.categories = [...new Set([...oldCategories, ...data.categories])];
  }

  courseList[idx] = { ...courseList[idx], ...data };
  saveCourses();
  return courseList[idx];
}

/**
 * Delete a course
 * @param {number} id
 * @returns {boolean} true if deleted
 */
export function deleteCourse(id) {
  const idx = _findCourseIndex(id);
  if (idx === -1) return false;
  courseList.splice(idx, 1);
  saveCourses();
  return true;
}

/**
 * Get a course by ID
 * @param {number} id
 * @returns {Course|null}
 */
export function getCourse(id) {
  return courseList.find(c => c.id === id) || null;
}

/**
 * List all courses
 * @returns {Course[]}
 */
export function listCourses() {
  return courseList;
}

/**
 * Increment visit count for a course
 * @param {number} courseId
 * @returns {number|null} updated visits or null if not found
 */
export function incrementVisits(courseId) {
  const c = getCourse(courseId);
  if (!c) return null;
  c.visits = (c.visits || 0) + 1;
  saveCourses();
  return c.visits;
}

/**
 * Get analytics about courses
 * @returns {{totalCourses: number, totalEnrollments: number, topCourses: Course[], topVisited: Course[]}}
 */
export function getAnalytics() {
  const totalCourses = courseList.length;
  const totalEnrollments = courseList.reduce((acc, c) => acc + (c.students?.length || 0), 0);
  const topCourses = [...courseList].sort((a, b) => (b.students?.length || 0) - (a.students?.length || 0)).slice(0, 3);
  const topVisited = [...courseList].sort((a, b) => (b.visits || 0) - (a.visits || 0)).slice(0, 3);
  return { totalCourses, totalEnrollments, topCourses, topVisited };
}

/**
 * Enroll a user in a course
 * @param {number|string} userId
 * @param {number} courseId
 * @returns {boolean} true if enrolled successfully
 */
export function enrollUser(userId, courseId) {
  const c = getCourse(courseId);
  if (!c) return false;
  c.students = c.students || [];
  if (c.students.some(s => s[0] === userId)) return false;
  c.students.push([userId, new Date().toISOString()]);
  saveCourses();
  return true;
}

/**
 * Search courses by category
 * @param {string} category
 * @returns {Course[]}
 */
export function searchCoursesByCategory(category) {
  if (!category || typeof category !== "string") return [];
  return courseList.filter(c => c.categories && c.categories.includes(category));
}

/**
 * Reset all courses (for testing/cleanup)
 */
export function resetAllCourses() {
  courseList = [];
  localStorage.removeItem(STORAGE_KEY_COURSES);
}

/**
 * Delete course completely and cleanup all associated data (progress, certificates, student enrollments)
 * @param {number} courseId
 * @returns {boolean} true if deleted
 */
export function courseDeletion(courseId) {
  const courseDeleted = deleteCourse(courseId);
  if (!courseDeleted) return false;

  cleanupCourseData(courseId);

  const students = listUsers().filter(user => user.role === "student");
  students.forEach(student => {
    const remainingCourses = student.enrolledCourses.filter(course => String(course) !== String(courseId));
    updateUser(student, { enrolledCourses: remainingCourses });
  });

  return true;
}
