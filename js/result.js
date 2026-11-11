const resultUser = JSON.parse(localStorage.getItem("currentUser"));
const quizResult = JSON.parse(localStorage.getItem("quizScore"));

if (!resultUser) {
  window.location.href = "index.html";
} else if (!quizResult) {
  window.location.href = "quiz.html";
} else {
  const percentage = Math.round((quizResult.score / quizResult.total) * 100);
  const passed = percentage >= 50;
  const resultMessage = document.getElementById("resultMessage");

  document.getElementById("resultName").textContent = resultUser.name;
  document.getElementById("scoreText").textContent = `${quizResult.score} / ${quizResult.total}`;
  document.getElementById("percentageText").textContent = `${percentage}%`;
  resultMessage.classList.add(passed ? "alert-success" : "alert-warning");
  resultMessage.textContent = passed ? "You passed the quiz. Keep up the good work!" : "You did not pass this time. Review the topics and try again.";
}

document.getElementById("tryAgainButton").addEventListener("click", function () {
  localStorage.removeItem("quizScore");
  window.location.href = "quiz.html";
});

document.getElementById("resultLogoutButton").addEventListener("click", logout);
