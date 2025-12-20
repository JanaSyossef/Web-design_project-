// Course System module:
// createCourse, editCourse, deleteCourse, getCourse, listCourses, getAnalytics, enrollUser, searchCoursesByCategory, incrementVisits

import { cleanupCourseData } from './progressSystem.js'; // Function to remove user related data (progress/certificates)
import { listUsers, updateUser } from "./userSystem.js"

// export let courseList = []; 
// We will populate this via listCourses() to maintain some backward compatibility with synchronous access checks,
// but consumers SHOULD wait for listCourses().
export let courseList = [];

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

/**
 * Load courses from API
 * @returns {Promise<Course[]>}
 */
async function fetchCourses() {
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) throw new Error('Failed to fetch courses');
    const data = await response.json();
    courseList = data; // Update local reference
    return courseList;
  } catch (e) {
    console.error(e);
    return [];
  }
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
 * @returns {Promise<Course|null>} created course or null if invalid
 */
export async function createCourse(course) {
  if (!course || !course.title) return null;

  // Ensure we have latest list for ID generation
  if (courseList.length === 0) await fetchCourses();

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

  try {
    const response = await fetch('/api/courses/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse)
    });

    if (response.ok) {
      courseList.push(newCourse);
      return newCourse;
    } else {
      console.error("Failed to create course on server");
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Edit existing course
 * @param {number} id
 * @param {Partial<Course>} data
 * @returns {Course|null} updated course or null if not found
 */
export function editCourse(id, data) {
  // TODO: Implement Backend Endpoint for Edit
  const idx = _findCourseIndex(id);
  if (idx === -1) return null;

  if (data.categories) {
    data.categories = Array.isArray(data.categories) ? data.categories : [];
    const oldCategories = courseList[idx].categories || [];
    data.categories = [...new Set([...oldCategories, ...data.categories])];
  }

  courseList[idx] = { ...courseList[idx], ...data };

  // Hack: Sync changes to server using sync endpoint? Or just leave local until refresh?
  // Ideally we need PUT /api/courses/:id
  console.warn("Edit saved locally but NOT persisted to backend yet (Missing Endpoint)");

  return courseList[idx];
}

/**
 * Delete a course
 * @param {number} id
 * @returns {Promise<boolean>} true if deleted
 */
export async function deleteCourse(id) {
  const idx = _findCourseIndex(id);
  if (idx === -1) return false;

  try {
    const response = await fetch('/api/courses/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      courseList.splice(idx, 1);
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Get a course by ID
 * @param {number} id
 * @returns {Course|null}
 */
export function getCourse(id) {
  // Synchronous check of loaded list. 
  // If list isn't loaded, this might return undefined.
  return courseList.find(c => c.id === id) || null;
}

/**
 * List all courses
 * @returns {Promise<Course[]>}
 */
export async function listCourses() {
  if (courseList.length === 0) {
    return await fetchCourses();
  }
  return courseList;
  // Note: This caches the first fetch. You might want to force fetch occasionally.
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
  // TODO: Persist visit count
  console.warn("Visits incremented locally but not persisted.");
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
  // TODO: Implement Backend Endpoint
  const c = getCourse(courseId);
  if (!c) return false;
  c.students = c.students || [];
  if (c.students.some(s => s[0] === userId)) return false;
  c.students.push([userId, new Date().toISOString()]);

  console.warn("Enrollment saved locally but NOT persisted to backend yet.");
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
  // localStorage.removeItem(STORAGE_KEY_COURSES);
}

/**
 * Delete course completely and cleanup all associated data (progress, certificates, student enrollments)
 * @param {number} courseId
 * @returns {Promise<boolean>} true if deleted
 */
export async function courseDeletion(courseId) {
  const courseDeleted = await deleteCourse(courseId);
  if (!courseDeleted) return false;

  cleanupCourseData(courseId);

  const students = listUsers().filter(user => user.role === "student");
  students.forEach(student => {
    const remainingCourses = student.enrolledCourses.filter(course => String(course) !== String(courseId));
    updateUser(student, { enrolledCourses: remainingCourses });
  });

  return true;
}
