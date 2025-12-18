import { getCourse } from "./courseSystem.js";
import { CourseFeedback } from "./CourseFeedback.js";


const STORAGE_KEY_COURSES = "cp_courses_videos";

export const courseVideos = loadCourseVideos() || [
  {
    "id": "2",
    "videos": [
      {
        "videoURL": String,
        "videoTitle": String
      }
    ]
  }
];

export const CourseInformation = {
  // videosURL: "../assets/videos/",
  // courseVideos: [ // key: courseid, value: array of videos URL --- But since no backend i will temporary set all courses to view same vids as an array
  //   ["Arrays.mp4", "Chapter 1: Arrays in Data Structure"],
  //   ["Backtracking.mp4", "Chapter 2: Backtracking Algorithm"],
  //   ["Heap.mp4", "Chapter 3: Heap Sort"],
  //   ["Pointers.mp4", "Chapter 4: Pointers"],
  //   ["Stack.mp4", "Chapter 5: What is a Stack?"]
  // ],




  getVideos(id) {
    const course = courseVideos.find(course => course.id === id);
    return course ? course.videos : [];
  },

  /*
    Returns: id: String
  */
  getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id;
  },

  getCourseVideoById(id) {
    return courseVideos.find(course => course.id === id) || null;
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
  courseInfo() {
    const id = Number(this.getIdFromURL());
    const course = getCourse(id);
    course.feedback = CourseFeedback.getFeedback(id.toString());
    return course;
  }
}


function loadCourseVideos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY_COURSES)) || []; } catch (e) { return []; }
}

function saveCourseVideos() {
  try { localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courseVideos)); } catch (e) { /*ignore*/ }
}

export function createVideo(id, url, title) {

  const videoFind = CourseInformation.getCourseVideoById(id);

  if(videoFind){
    const videos = 
      {
        videoTitle: title,
        videoURL: url
      }
    videoFind.videos.push(videos);
  }else{
    const newVideo = {
      id: id,
      videos: [
        {
          videoTitle: title,
          videoURL: url
        }
      ]
    };
    courseVideos.push(newVideo);
  }

  saveCourseVideos();
}