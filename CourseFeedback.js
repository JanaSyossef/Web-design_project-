// Variables

/**
 * @typedef {Object} CourseFeedback
 * @property {string} userId
 * @property {string} comment
 * @property {number} stars
 */

/**
 * @typedef {Object} Course
 * @property {string} courseId
 * @property {CourseFeedback[]} feedbacks
 */






// Functions

export const CourseFeedback = {

  
  feedback : [
    {
      courseId: "course101",
      feedbacks: [
        { userId: "Zak", comment: "AAAA", stars: 3.5 },
        { userId: "Ali", comment: "Bleh", stars: 4.3 }
      ]
    },
    {
      courseId: "course102",
      feedbacks: [
        { userId: "Awad", comment: "Screamin", stars: 2.8 },
        { userId: "Mazen", comment: "Bad ew", stars: 4.9 }
      ]
    }
  ],

  /**
   * Add new feedback to course
   * @param {string} courseId
   * @param {string} userId
   * @param {string} comment
   * @param {number} stars
   * @returns {boolean}
   */

  addFeedback(courseId, userId, comment, stars) {
    let course = feedback.find(c => c.courseId === courseId);

    if (!course) {
      course = { courseId, feedbacks: [] };
      feedback.push(course);
    }

    const existingFeedback = course.feedbacks.find(f => f.userId === userId);
    if (existingFeedback) {
      return false;
    }

    course.feedbacks.push({ userId, comment, stars });
    return true;
  },



  /**
   * Get all feedback for course
   * @param {string} courseId
   * @returns {CourseFeedback[]}
   */

  getFeedback(courseId) {
    const course = feedback.find(c => c.courseId === courseId);
    return course?.feedbacks || [];
  },

  /**
   * Calculate average rating for course
   * @param {string} courseId
   * @returns {number}
   */

  getAverageRating(courseId) {
    const feedbacks = CourseFeedback.getFeedback(courseId);
    if (feedbacks.length === 0) return 0;

    const totalStars = feedbacks.reduce((sum, f) => sum + f.stars, 0);
    return totalStars / feedbacks.length;
  }
}

//  Testing
CourseFeedback.addFeedback("course101", "Emma", "Skill issue", 2.3);
CourseFeedback.addFeedback("course101", "Diana", "Trash bleh", 1.0);
CourseFeedback.addFeedback("course101", "Diana", "EWWWWWWWWWWWWW bleh", 0);
CourseFeedback.addFeedback("course101", "MESSi", "EWWWWWWWWWWWWW bleh", 0);
console.log("%c feedback testing","color:red;")
console.log(CourseFeedback.getFeedback("course101"));
console.log(CourseFeedback.getAverageRating("course101"));
