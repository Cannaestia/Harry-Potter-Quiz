var resetButton = document.querySelector(".reset-button");
var startButton = document.querySelector(".start-button");
var timeEl = document.querySelector(".timer-count");
var startEl = document.querySelector(".start");
var quizEl = document.querySelector(".quiz");
var endEl = document.querySelector(".end");
var quizTitle = document.querySelector(".title .quiz");
var questionEl = document.querySelector(".questions");
var resetEl = document.querySelector(".reset");
var submitEl = document.querySelector(".submit");
var scoreEl = document.querySelector(".score");
var initialEl = document.querySelector(".initials");
var highScoreEl = document.querySelector(".highscores");
var initNameEl = document.querySelector(".initname");
var titleEl = document.querySelector(".hightitle");
var q1El = document.querySelector(".q1");
var q2El = document.querySelector(".q2");
var q3El = document.querySelector(".q3");
var q4El = document.querySelector(".q4");
var cursor = 0;
var score = 0;
var timeLeft = 100;

// Questions for the quiz

var questions = [
  {
    title: "What house did the sorting hat place Harry Potter in?",
    choices: {
      a: "Hufflepuff",
      b: "Ravenclaw",
      c: "Gryffindor",
      d: "Slytherin",
    },
    answer: "Gryffindor",
  },
  {
    title: "What was the name of the main villian throughout the series?",
    choices: { a: "Jack", b: "Voldermort", c: "Kai", d: "Draco" },
    answer: "Voldermort",
  },
  {
    title: "What was Harry Potters Patronus Charm?",
    choices: { a: "Elephant", b: "Rabbit", c: "Stag", d: "Bear" },
    answer: "Stag",
  },
  {
    title: "Who was the potions professor?",
    choices: {
      a: "Professor Snape",
      b: "Professor McGonagall ",
      c: "Professor Filch",
      d: "Professor Lockhart",
    },
    answer: "Professor Snape",
  },
  {
    title: "What position did Harry play in Quidditch?",
    choices: {
      a: "Defense",
      b: "Offence",
      c: "Seeker",
      d: "He didn't play Quiddtich",
    },
    answer: "Seeker",
  },
  {
    title: "What was the drink of choice in Hogsmeade?",
    choices: { a: "Cola", b: "Butterbeer", c: "Tea", d: "Polyjuice" },
    answer: "Butterbeer",
  },
  {
    title: "What was the name of the House Elf that Harry frees?",
    choices: { a: "Chuckles", b: "Fred", c: "Buzzer", d: "Dobby" },
    answer: "Dobby",
  },
  {
    title: "What was the name of Voldermorts followers?",
    choices: {
      a: "Death Eaters",
      b: "The Hallows",
      c: "The Voldermort Gang",
      d: "Dark Magicians",
    },
    answer: "Death Eaters",
  },
  {
    title: "WWhat platform did the Hogwarts Express leave from?",
    choices: { a: "2", b: "2 and 1/3", c: "9 and 3/4", d: "9" },
    answer: "9 and 3/4",
  },
  {
    title: "What creature makes a horrible screech when being removed from a plant pot?",
    choices: {
      a: "Boggarts",
      b: "Dementors",
      c: "Mandrakes",
      d: "Acromantula",
    },
    answer: "Mandrakes",
  },
];
console.log(questions);

// Enables user to go to the next question via the Cursor / index of the questions array

function displayQuestions() {
  questionEl.textContent = questions[cursor].title;
  q1El.textContent = questions[cursor].choices.a;
  q2El.textContent = questions[cursor].choices.b;
  q3El.textContent = questions[cursor].choices.c;
  q4El.textContent = questions[cursor].choices.d;

  q1El.addEventListener("click", nextQuestion);
  q2El.addEventListener("click", nextQuestion);
  q3El.addEventListener("click", nextQuestion);
  q4El.addEventListener("click", nextQuestion);
}
displayQuestions();

// The event listener that triggers the next question. It also lets the player know if they have answered correctly or not.

function nextQuestion(event) {
  var selection = event.target.textContent;
  var correctAnswer = questions[cursor].answer;
  if (selection === correctAnswer) {
    alert("Congrats Muggle, that is correct!");
    score += 1;
  } else {
    alert("OHHHH SORRY, Incorrect!");
    timeLeft -= 20;
    
  }
  cursor++;
  console.log(score);

  if (cursor === questions.length) {
    endQuiz();
  } else {
    console.log("PURPLE");
    displayQuestions();
    showQuestions();
  }
}

// These determin what part of the quiz is showing pased on what part of the quiz you are on ie Start, Quiz, or End 

function showQuestions() {
  quizEl.setAttribute("class", "");
  startEl.setAttribute("class", "hide");
  endEl.setAttribute("class", "hide");
}
function endQuiz() {
  quizEl.setAttribute("class", "hide");
  startEl.setAttribute("class", "hide");
  endEl.setAttribute("class", "");
  scoreEl.textContent = 'You got' + ' ' + score + ' out of' + ' ' + questions.length + ' correct!';
}

// Creates the timer and how long the player has left. Once time runs out it runs the endQuiz function which takes you to the final part of the quiz.

function startTimer() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timeEl.textContent = "Tempus: " + timeLeft;
      timeLeft--
    } else if (timeLeft === 1) {
      timeEl.textContent = "Tempus: " + timeLeft;
      timeLeft--
    } else {
      timeEl.textContent = "";
      clearInterval(timeInterval);
      endQuiz()
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  showQuestions();
  startTimer();
});

// Saves a players name and score to the localstorage and is displayed on the screen.

function savetoLocal() {
  var highScore = JSON.parse(localStorage.getItem("highscore")) || [];
  var playerIn = JSON.parse(localStorage.getItem("initials")) || [];
  var winner = playerName;
  highScore.push(score);
  playerIn.push(winner);

  localStorage.setItem("highscore", JSON.stringify(highScore));
  localStorage.setItem("initials", JSON.stringify(playerIn));

  var playerInit 

  for ( let i = 0; i < highScore.length; i++) {
    var div = document.createElement('div');
    div.className = "score-show";
    div.textContent = playerIn[i] + " " + "(" + "Points" + " " + highScore[i] + ")";
    initNameEl.appendChild(div);
  }
  initialEl.value = '';
  console.log("NERD",highScore)
}

submitEl.addEventListener("click", function(event) {
  event.preventDefault;
  playerName = initialEl.value;
  savetoLocal();
})

  
  function reset() {
    quizEl.setAttribute("class", "hide");
    startEl.setAttribute("class", "");
    endEl.setAttribute("class", "hide");
    location.reload();
    score = 0
    cursor = 0
    timeLeft = 100
    
    
  }
  resetEl.addEventListener("click",reset)

  window.onload = function () {
    document.getElementById("audio").play();
}
  
  