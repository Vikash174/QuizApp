const totalquestionList = 10;
const API_URL = `https://opentdb.com/api.php?amount=${totalquestionList}&category=18&type=multiple`;
const questionELement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;
let questionList = new Array();
 

async function getquestionListFromApi(){
    const res = await fetch(API_URL);
      let data = await res.json();
      while(questionList.length > 0) {
        questionList.pop();
       }
     
      data.results.forEach(result => {
        let question = result.question;
        let answers = new Array();
         result.incorrect_answers.forEach(incorrectAnswer=>{
              let answer = new Answer();
              answer.text = incorrectAnswer;
              answer.correct = false;
              answers.push(answer);
         });
         let answer = new Answer();
              answer.text = result.correct_answer;
              answer.correct = true;
              answers.push(answer);

         let questionObj = new Question(question,answers);
         questionList.push(questionObj);     
      });
      console.log(questionList);

       showQuestion();
  }

  

   function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";

    
    getquestionListFromApi();  
   }


   function resetState(){
    
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    } 
 }


   function showQuestion(){
    resetState();
    let currQuestion = questionList[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionELement.innerHTML = questionNumber + ". "+ currQuestion.question;

    currQuestion.answers.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click",selectAnswer);
    });
    
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
      selectedBtn.classList.add("correct");
      score++;
  }else{
      selectedBtn.classList.add("incorrect");
  }
   
  Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
        button.disabled = true;
  });

  nextButton.style.display = "block";

}

function showScore(){
  resetState();
  questionELement.innerHTML = `You scored ${score} out of ${questionList.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questionList.length){
      showQuestion();
  }else{
      showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questionList.length){
      handleNextButton();
  }else{
      startQuiz();
  }
});
startQuiz();









class Question {
  constructor(question,answers) {
    this.question = question;
    this.answers = answers;
  }
}
class Answer {
  constructor(text,correct) {
    this.text = text;
    this.correct = correct;
  }
}
