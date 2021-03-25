var quizBody = document.getElementById("quiz");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");

var quizQuestions = [
  {
    question: "Which of the following is the strict equality operator sign?",
    choiceA: "++",
    choiceB: "=",
    choiceC: "===",
    choiceD: "<==",
    correctAnswer: "c",
  },
  {
    question: "What is the correct syntax when using arrays?",
    choiceA: " { } ",
    choiceB: " | | ",
    choiceC: " [ ] ",
    choiceD: " / / ",
    correctAnswer: "c",
  },
  {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b",
  },
  {
    question: "What type of tag are urls wrapped in?",
    choiceA: " <a> ",
    choiceB: " <header> ",
    choiceC: " <href> ",
    choiceD: " <link> ",
    correctAnswer: "d",
  },
  {
    question: "Where is the local data stored?",
    choiceA: "Within the browser",
    choiceB: "After page reload",
    choiceC: "within webpage you are visiting",
    choiceD: "In your browser search history",
    correctAnswer: "a",
  },
  {
    question: "Which is not a JavaScript data type?",
    choiceA: "String",
    choiceB: "Boolean",
    choiceC: "identified",
    choiceD: "Unidentified",
    correctAnswer: "c",
  },
  {
    question:
      "What HTML attribute references an external JavaScript or CSS file?",
    choiceA: "link",
    choiceB: "src",
    choiceC: "id",
    choiceD: "main",
    correctAnswer: "b",
  },
  {
    question: "Which of the following is the bang operator sign?",
    choiceA: "!",
    choiceB: "!!",
    choiceC: "/?",
    choiceD: "=!=",
    correctAnswer: "a",
  },
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    currentQuestionIndex++;
    alert("CORRECT!!!!");

    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    currentQuestionIndex++;
    alert("INCORRECT!");
    timeLeft = timeLeft - 10;

    generateQuizQuestion();
  } else {
    showScore();
  }
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

    generateHighscores();
  }
});

function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " questions correct! Good Job!";
}

function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

startQuizButton.addEventListener("click", startQuiz);
