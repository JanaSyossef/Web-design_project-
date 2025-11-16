// Variables

/**
 * @typedef {Object} data
 * @property {string} nameInput
 * @property {string} emailInput
 * @property {string} messageInput
 */


//Example
const data ={
  //nameInput: "Youssef",
  //emailInput: "yokeyoussef@gmail.com",
  //messageInput: "Hahaha jk lololol"
};


// Functions

export const Feedback = {

  /**
   * Submits the Feedback message.
   * @param {object} data 
   * @returns {boolean}
   */

  submitFeedback(event, data){    

    event.preventDefault();
    console.log(JSON.stringify(data))

    try{
      fetch("/feedback", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        bodyOfMessage: JSON.stringify(data),
      });
    }
    catch{
      return false;
    }
    return true;
  }
}


