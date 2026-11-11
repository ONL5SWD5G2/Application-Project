const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  window.location.href = "index.html";
} else {
  document.getElementById("studentName").textContent = currentUser.name;
}

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const quizMessage = document.getElementById("quizMessage");
const quizContent = document.getElementById("quizContent");
const questionNumber = document.getElementById("questionNumber");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answerChoices = document.getElementById("answerChoices");
const nextButton = document.getElementById("nextButton");

async function loadQuestions() {
  try {
    const response = await fetch("data/questions.json");

    if (!response.ok) {
      throw new Error("Could not load questions");
    }

    questions = await response.json();
    showQuestion();
  } catch (error) {
    quizContent.classList.add("d-none");
    quizMessage.innerHTML = '<div class="alert alert-danger" role="alert">Unable to load the quiz. Please run the project using Live Server and try again.</div>';
  }
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressText.textContent = `${Math.round(progress)}% complete`;
  progressBar.style.width = `${progress}%`;
  questionText.textContent = question.question;
  answerChoices.innerHTML = "";

  question.choices.forEach(function (choice, index) {
    const option = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    option.className = "form-check border rounded p-3";
    input.className = "form-check-input";
    input.type = "radio";
    input.name = "answer";
    input.id = `answer${index}`;
    input.value = index;
    label.className = "form-check-label w-100";
    label.htmlFor = `answer${index}`;
    label.textContent = choice;
    option.append(input, label);
    answerChoices.appendChild(option);
  });

  nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next";
  quizMessage.innerHTML = "";
}

nextButton.addEventListener("click", function () {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    quizMessage.innerHTML = '<div class="alert alert-danger" role="alert">Please select an answer before continuing.</div>';
    return;
  }

  if (Number(selectedAnswer.value) === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    localStorage.setItem("quizScore", JSON.stringify({ score: score, total: questions.length }));
    window.location.href = "result.html";
  }
});

document.getElementById("logoutButton").addEventListener("click", logout);

if (currentUser) {
  loadQuestions();
}
