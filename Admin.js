// Variables

/**
 
 */

import { CourseSystem } from "./courseSystem.js";
import { ExploreSystem } from "./explore.js";


// Functions
export const AdminSystem = {
  
  createCourse(course){
     CourseSystem.createCourse(course);
  },

  deleteCourse(id){
    CourseSystem.deleteCourse(id)
  },

  editCourse(id, data){
    CourseSystem.editCourse(id, data)
  },

  viewAnalytics(){ 
    ExploreSystem.getTrending();
  }

};

// Testing

AdminSystem.createCourse(CourseSystem.course)
