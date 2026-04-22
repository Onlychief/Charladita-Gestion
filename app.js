const LOGIN_KEY = "gestion_restaurante_session";
const DEMO_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const loginCard = document.getElementById("login-card");
const dashboardCard = document.getElementById("dashboard-card");
const loginForm = document.getElementById("login-form");
const feedback = document.getElementById("feedback");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const userDisplay = document.getElementById("user-display");
const logoutButton = document.getElementById("logout-btn");

function setFeedback(message, type) {
  feedback.textContent = message;
  feedback.classList.remove("error", "success");
  if (type) {
    feedback.classList.add(type);
  }
}

function showDashboard(username) {
  userDisplay.textContent = username;
  loginCard.classList.add("hidden");
  dashboardCard.classList.remove("hidden");
}

function showLogin() {
  loginCard.classList.remove("hidden");
  dashboardCard.classList.add("hidden");
  loginForm.reset();
  setFeedback("");
}

function persistSession(username) {
  localStorage.setItem(LOGIN_KEY, JSON.stringify({ username }));
}

function clearSession() {
  localStorage.removeItem(LOGIN_KEY);
}

function getSession() {
  const raw = localStorage.getItem(LOGIN_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    clearSession();
    return null;
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    setFeedback("Completa usuario y contraseña.", "error");
    return;
  }

  const isValid =
    username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;

  if (!isValid) {
    setFeedback("Credenciales inválidas. Intenta nuevamente.", "error");
    return;
  }

  persistSession(username);
  setFeedback("Ingreso exitoso.", "success");
  showDashboard(username);
});

logoutButton.addEventListener("click", () => {
  clearSession();
  showLogin();
});

const session = getSession();
if (session?.username) {
  showDashboard(session.username);
}
