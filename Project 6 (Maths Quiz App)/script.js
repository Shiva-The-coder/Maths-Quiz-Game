const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

let score = parseInt(localStorage.getItem("score")) || 0;
let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let storedAnswer;

scoreEl.innerText = score;
highScoreEl.innerText = highScore;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateQuestion() {
  const num1 = randomNumber(1, 10);
  const num2 = randomNumber(1, 10);
  const type = randomNumber(1, 4);

  let question = "";
  let answer = 0;

  switch (type) {
    case 1:
      question = `Q. What is ${num1} × ${num2}?`;
      answer = num1 * num2;
      break;
    case 2:
      question = `Q. What is ${num1} + ${num2}?`;
      answer = num1 + num2;
      break;
    case 3:
      question = `Q. What is ${num1} - ${num2}?`;
      answer = num1 - num2;
      break;
    case 4:
      question = `Q. What is ${num1} ÷ ${num2}? (Round to nearest integer)`;
      answer = Math.round(num1 / num2);
      break;
  }

  return { question, answer };
}

function showQuestion() {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  storedAnswer = answer;
}

function checkAnswer(event) {
  event.preventDefault();
  const formData = new FormData(questionFormEl);
  const userAnswer = +formData.get("answer");

  if (userAnswer === storedAnswer) {
    score += 1;
    playSound("correct");
    showToast(`✅ Correct! Score: ${score}`, "#00b09b");
  } else {
    score -= 1;
    playSound("wrong");
    showToast(`❌ Wrong! Correct: ${storedAnswer} | Score: ${score}`, "#ff001e");
  }

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.innerText = highScore;
  }

  scoreEl.innerText = score;
  localStorage.setItem("score", score);
  event.target.reset();
  showQuestion();
}

function resetScore() {
  score = 0;
  scoreEl.innerText = score;
  localStorage.setItem("score", score);
  showToast("🔄 Score Reset", "#999");
}

function playSound(type) {
    const correctSound = "https://cdn.jsdelivr.net/gh/AngelGarcia13/Audio-Files/correct-answer.mp3";
    const wrongSound = "https://cdn.jsdelivr.net/gh/AngelGarcia13/Audio-Files/wrong-answer.mp3";
    const sound = new Audio(type === "correct" ? correctSound : wrongSound);
    sound.play().catch((e) => console.error("Sound error:", e));
  }
  

function showToast(message, color) {
  Toastify({
    text: message,
    duration: 2500,
    gravity: "bottom",
    position: "center",
    style: {
      background: color,
      borderRadius: "10px",
    },
  }).showToast();
}

showQuestion();



