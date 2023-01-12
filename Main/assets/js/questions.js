// Variables
var startQuiz = document.querySelector("#startButton");
var questionSection = document.querySelector("#questions");
var highScores = document.querySelector("#highscores")
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

// TIMER AND HIGHSCORE
let timerLeft = 75;
let highscore = 0;

// LOCAL STORAGE
if (localStorage.getItem("playerdata")) {
  var highScoreData = JSON.parse(localStorage.getItem("playerdata"));
  
}
else{
  highScoreData = [];
}

startQuiz.addEventListener("click", function(){
  timerCountdown();
  document.querySelector("#answers").style.pointerEvents = 'auto';
  showQuestions();
});


function timerCountdown() {
  var timerInterval = setInterval(function() {
    document.querySelector("#startButton").style.pointerEvents = 'none';
    timerLeft--;
    startQuiz.textContent = timerLeft + " seconds left.";

    if(timerLeft <= 0 || firstQuestion > lastQuestion){
      clearInterval(timerInterval);
      startQuiz.textContent = "All Done!";
      endQuiz();
      return;
    }
    
  }, 1000);
    
}


function endQuiz() {
  answer1.textContent = "";
  answer2.textContent = "";
  answer3.textContent = "";
  answer4.textContent = "";
  document.querySelector("#answers").style.pointerEvents = 'none';
  var finalScore = JSON.stringify(highScores);
  var enterInitials = prompt("Enter your Initials.");
  var playerData = {
    playerInitials: enterInitials,
    playerScore: finalScore
  }

  highScoreData.push(playerData);
  localStorage.setItem("playerdata", JSON.stringify(highScoreData));
  window.location.href = '/highscores.html';
  return;
}


// list of all questions, choices, and answers
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

let firstQuestion = 0;
let lastQuestion = questions.length -1;

function showQuestions(){
  let cq = questions[firstQuestion];
  questionSection.textContent = cq.title;
  answer1.textContent = cq.choices[0];
  answer2.textContent = cq.choices[1];
  answer3.textContent = cq.choices[2];
  answer4.textContent = cq.choices[3];
}


function playerRank(){

  if (localStorage.getItem("playerdata")){
    highScoreData = JSON.parse(localStorage.getItem("playerdata"));

    highScoreData.sort(function scoreOrder(a,b){
      if (a.playerScore > b.playerScore){
        return -1;
        
      }
      if (a.playerScore < b.playerScore) {
        return 1;

      }
      if (a.playerScore == b.playerScore) {
        return 0;
        
      }
    });
  }
    else{
      highScoreData = [];
    }
  



  localStorage.setItem("playerdata" , JSON.stringify(highScoreData))
  for (var i = 0; i < highScoreData.length; i++) {
  var userRank = highScoreData[i].playerInitials;
  var userScore = highScoreData[i].playerScore;

  var li = document.createElement("li");
  li.textContent = userRank + " " + userScore;
  li.setAttribute("playerdata" , i);
  highScores.appendChild(li);
  
  }
}  

playerRank();