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

let exp = localStorage.getItem('expPoints') || 0;
exp = parseInt(exp) + 100;
document.getElementById('expPoints').innerText = exp;
localStorage.setItem('expPoints', exp);

const today = new Date().toDateString();
const lastVisit = localStorage.getItem('lastVisitDate');
let streak = parseInt(localStorage.getItem('streakDays')) || 0;

if(lastVisit !== today){
    streak += 1;
    localStorage.setItem('lastVisitDate', today);
    localStorage.setItem('streakDays', streak);
}

document.getElementById('streakCount').innerText = streak;
