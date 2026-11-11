const studentsKey = "students";
const currentUserKey = "currentUser";

function getStudents() {
  return JSON.parse(localStorage.getItem(studentsKey)) || [];
}

function showMessage(element, text, type) {
  element.innerHTML = `<div class="alert alert-${type}" role="alert">${text}</div>`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (!name || !email || !password || !confirmPassword) {
      showMessage(message, "Please fill in all fields.", "danger");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage(message, "Please enter a valid email address.", "danger");
      return;
    }

    if (password.length < 6) {
      showMessage(message, "Password must contain at least 6 characters.", "danger");
      return;
    }

    if (password !== confirmPassword) {
      showMessage(message, "Passwords do not match.", "danger");
      return;
    }

    const students = getStudents();
    const exists = students.some(function (student) {
      return student.email === email;
    });

    if (exists) {
      showMessage(message, "This email is already registered.", "danger");
      return;
    }

    students.push({
      id: Date.now(),
      name: name,
      email: email,
      password: password
    });

    localStorage.setItem(studentsKey, JSON.stringify(students));
    window.location.href = "index.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (!email || !password) {
      showMessage(message, "Please enter your email and password.", "danger");
      return;
    }

    const student = getStudents().find(function (item) {
      return item.email === email && item.password === password;
    });

    if (!student) {
      showMessage(message, "Email or password is incorrect.", "danger");
      return;
    }

    localStorage.setItem(currentUserKey, JSON.stringify(student));
    window.location.href = "quiz.html";
  });
}

function logout() {
  localStorage.removeItem(currentUserKey);
  localStorage.removeItem("quizScore");
  window.location.href = "index.html";
}
