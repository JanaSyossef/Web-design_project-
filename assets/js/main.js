import { Feedback } from "./Modules/Feedback.js";

//Submit feedback

let data = {};

let formy = document.querySelector(".footer-feedback");

formy.addEventListener("submit", function(e){
    data.name = formy[0].value;
    data.email = formy[1].value;
    data.message = formy[2].value;
    Feedback.submitFeedback(e, data)
    window.location.reload();
})


