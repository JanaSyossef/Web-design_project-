
import { getCurrentUser } from "./Modules/userSystem.js"
import { getUserXP } from "./Modules/progressSystem.js"
import { getCourse } from "./Modules/courseSystem.js"
import { updateUser } from "./Modules/userSystem.js"

// Helper Functions

const $  = selector => document.querySelector(selector)


// References

const sidebar = {
  profile : $(`#sidebar-profile`),
  password: $(`#sidebar-changePassword`),
  courses: $(`#sidebar-myCourses`)
}

const info = {
  name : $(`#info-box-name`),
  email : $(`#info-box-email`),
  password : $(`#info-box-password`)
}

const burger = $(`.burger`);

const statsBox = {
    exp : $('#expPoints'),
    totalCourses : $(`#stat-card-totalCourses`)
}

const myCourses = $(`#coursesSection`)

const password = {
  newPassword : $(`#new-password`),
  confirmPassword : $(`#confirm-password`),
  submitBtn : $(`#submitPasswordChange`)
}

// Functions

function previewPhoto(event){
  const reader = new FileReader();
  reader.onload = function(){
    document.getElementById('profileImg').src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function toggleSidebar(){
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  sidebar.classList.toggle('active');
  main.classList.toggle('shift');
}

function showProfile(){
  document.getElementById('profileSection').style.display="block";
  document.getElementById('changePasswordSection').style.display="none";
  document.getElementById('coursesSection').style.display="none";
}

function showChangePassword(){
  document.getElementById('profileSection').style.display="none";
  document.getElementById('changePasswordSection').style.display="flex";
  document.getElementById('coursesSection').style.display="none";
}

function showMyCourses(){
  document.getElementById('profileSection').style.display="none";
  document.getElementById('changePasswordSection').style.display="none";
  document.getElementById('coursesSection').style.display="flex";
}

function loadCourses(){
  const information = getCurrentUser();
  information.enrolledCourses.forEach(courseId => {
    const courseInfo = getCourse(courseId);
    const courseCard = document.createElement(`div`);
    courseCard.classList.add(`course-card`);
    courseCard.innerHTML = `
      <img src="../assets/images/aaa.png" alt="Course Image">
      <div class="course-details">
      <h4>${courseInfo.title}</h4>
      <p>${courseInfo.description}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:50%"></div></div>
      <p>Videos: Soon | Hours: Soon</p>
    </div>
    `
    myCourses.append(courseCard)
  });
}

// Temp function to verify password.
function verifyPassword(){
  return ((password.newPassword.value === password.confirmPassword.value) && (password.newPassword.value.length !== 0))
}


function onload(){
  let information = getCurrentUser();
  info.name.innerHTML = `${information.name}`
  info.email.innerHTML = `${information.email}`
  info.password.innerHTML = `${"*".repeat(information.password.length)}`
  statsBox.exp.innerHTML = `${getUserXP(information.id)}`
  statsBox.totalCourses.innerHTML = `${information.enrolledCourses.length}`
  loadCourses()
}


onload()

// Event Listeners

burger.addEventListener("click", () =>{
  toggleSidebar();
})
sidebar.profile.addEventListener("click", () => showProfile())
sidebar.password.addEventListener("click", () => showChangePassword())
sidebar.courses.addEventListener("click", () => showMyCourses())
password.submitBtn.addEventListener("click", () =>{
  if(verifyPassword()){
    updateUser(getCurrentUser(), {password : password.newPassword.value})
  } // This updates password into a possibly weak one.

});
