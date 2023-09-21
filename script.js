
const totalQuestions = 10;
const API_URL = `https://opentdb.com/api.php?amount=${totalQuestions}&category=18&type=multiple`;
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const question = document.getElementById("question");
let answerButtons = document.querySelectorAll(".btn");
let currentQuestionCount = -1;

 

async function getQuestionsFromApi(){
    const res = await fetch(API_URL);
      let data = await res.json();
      startButton.addEventListener("click",function(){
        document.querySelector(".quiz").style.display = "block";
        startButton.style.display = "none";
        nextButton.style.display = "block";
        showNextQuestion(data);
      });

      nextButton.addEventListener("click",function(){
        // console.log("next button clicked");
        showNextQuestion(data);
      })

}

function checkAnswerAndUpdateUI(data){
  for (let index = 0; index < answerButtons.length; index++) {
    const button = answerButtons[index];
       button.addEventListener("click",function(){
          let choosenAns = button.innerHTML;

          let questionInfo = data.results[currentQuestionCount]

          if(choosenAns === questionInfo.correct_answer){
            currentScore++;
            console.log("Yeh !! Correct Answer !!");
            button.style.backgroundColor = "green";
          }else{
            console.log("Oh No !! Wrong Answer !!");
            button.style.backgroundColor = "red";
          }
          // console.log(choosenAns);
       });
  }

}


function showNextQuestion(data){

      if(currentQuestionCount !== totalQuestions-1){      

               currentQuestionCount++;
         let questionInfo = data.results[currentQuestionCount]
          question.innerHTML = questionInfo.question;
          
          
         for (let index = 0; index < answerButtons.length-1; index++) {
             const button = answerButtons[index];
            button.innerHTML = questionInfo.incorrect_answers[index];
         }
         answerButtons[3].innerHTML = questionInfo.correct_answer;

         checkAnswerAndUpdateUI(data);
      

        //  console.log(currentQuestionCount);
      }else{
        
        console.log(`You have reached to the end of questions. Your Score is ${currentScore}`);
      }

    //  console.log(answerButtons);
     
}


getQuestionsFromApi();






 
   


