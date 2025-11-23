import { getCourse } from "./courseSystem.js";
import { CourseFeedback } from "./CourseFeedback.js";

export const CourseInformation = {
  videosURL: "../assets/videos/",
  courseVideos: [ // key: courseid, value: array of videos URL --- But since no backend i will temporary set all courses to view same vids as an array
    ["Arrays.mp4", "Chapter 1: Arrays in Data Structure"],
    ["Backtracking.mp4", "Chapter 2: Backtracking Algorithm"],
    ["Heap.mp4", "Chapter 3: Heap Sort"],
    ["Pointers.mp4", "Chapter 4: Pointers"],
    ["Stack.mp4", "Chapter 5: What is a Stack?"]
  ], 

  /*
    Returns: id: String
  */
  getIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
  },

  /* Returns 
    {
      category: string, 
      description: string, 
      enrolled: number, 
      id: number, 
      instructor: string, 
      status: string,
      students: array,
      tags: array,
      title: string
    }
  */
  courseInfo(){
    const id = Number(this.getIdFromURL());
    const course = getCourse(id);
    course.feedback = CourseFeedback.getFeedback(id.toString());
    return course;
  }
}
