const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.id) {
        messageEl.textContent = "Compte créé, vous pouvez vous connecter";
        messageEl.className = "success";
        signupForm.reset();
      } else {
        messageEl.textContent = data.message || "Erreur lors de l'inscription";
        messageEl.className = "error";
      }
    })
    .catch(function (err) {
      messageEl.textContent = "Erreur réseau";
      messageEl.className = "error";
    });
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.id) {
        messageEl.textContent = "Connecté en tant que " + data.username;
        messageEl.className = "success";
        window.location.href = "dashboard.html";
      } else {
        messageEl.textContent = data.message || "Erreur lors de la connexion";
        messageEl.className = "error";
      }
    })
    .catch(function (err) {
      messageEl.textContent = "Erreur réseau";
      messageEl.className = "error";
    });
});