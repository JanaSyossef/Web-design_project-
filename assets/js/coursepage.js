// Modules
import { CourseInformation } from "./Modules/CourseInformation.js";

// References
const videoName = document.querySelector("h2.course-title");
const courseTitle = document.querySelector("h4.course-title");
const video = document.querySelector("#video-player");
const rating = document.querySelector(".rating"); // Message to Tony -- Handle this with courseFeedback System
const comments = document.querySelector(".comments"); // Message to Tony -- Handle this with courseFeedback System
const links = document.querySelectorAll(".course-sidebar a");

// Functions
function getCourseData(){
  return CourseInformation.courseInfo();
}

function loadVideo(index){
  let information = getCourseData();
  videoName.innerHTML = `${information.title}`
  courseTitle.innerHTML = `${CourseInformation.courseVideos[index][1]}`;
  video.querySelector("source").src = `${CourseInformation.videosURL}${CourseInformation.courseVideos[index][0]}`;
  video.load();
}

// Events
links.forEach((link, i) => {
  link.addEventListener("click", () => {
    console.log("Clicked:", i, link.textContent);
    loadVideo(i);
  });
});


try{
  loadVideo(0);
}catch{
  window.location.href="errorpage.html"
}