const translations = {
  en: {
    heading: "Phishing Simulation Detected",
    subheading: "This was part of an internal cybersecurity training by Synergy Medical Group.",
    signsTitle: "Signs of Phishing",
    signs: [
      "Urgent messages or threats",
      "Suspicious or unfamiliar sender",
      "Links that don’t match real domains",
      "Requests for credentials"
    ],
    actionsTitle: "What You Should Do",
    actions: [
      "Hover over links to verify destinations",
      "Report anything suspicious to IT",
      "Never enter credentials unless you’re sure"
    ],
    quizTitle: "Test Your Knowledge",
    report: "Report suspicious emails:"
  },
  es: {
    heading: "Simulación de Phishing Detectada",
    subheading: "Esto fue parte de una capacitación interna de ciberseguridad de Synergy Medical Group.",
    signsTitle: "Señales de Phishing",
    signs: [
      "Mensajes urgentes o amenazas",
      "Remitente sospechoso o desconocido",
      "Enlaces que no coinciden con dominios reales",
      "Solicitudes de credenciales"
    ],
    actionsTitle: "Qué Deberías Hacer",
    actions: [
      "Pasa el cursor sobre los enlaces para verificar su destino",
      "Reporta cualquier cosa sospechosa al equipo de TI",
      "Nunca ingreses credenciales a menos que estés seguro"
    ],
    quizTitle: "Pon a Prueba Tu Conocimiento",
    report: "Reporta correos sospechosos:"
  }
};

function setLanguage(lang) {
  const t = translations[lang];
  document.querySelector("h1").textContent = t.heading;
  document.querySelector("header p").textContent = t.subheading;
  document.querySelectorAll("section h2")[0].textContent = t.signsTitle;
  document.querySelectorAll("section h2")[1].textContent = t.actionsTitle;
  document.querySelectorAll("section h2")[2].textContent = t.quizTitle;
  const signItems = document.querySelectorAll("section ul")[0].children;
  const actionItems = document.querySelectorAll("section ul")[1].children;
  t.signs.forEach((text, i) => { if (signItems[i]) signItems[i].textContent = text; });
  t.actions.forEach((text, i) => { if (actionItems[i]) actionItems[i].textContent = text; });
  document.querySelector(".report-box strong").textContent = t.report;
}

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  if (user) {
    // Get IP and log to Google Sheets
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => {
        const ip = data.ip;
        const logURL = "https://script.google.com/macros/s/AKfycbyW0Mvq5FcscFJDdO3e7A9SnLY0owpnLPtFRy9vjEHon-VZmPn9x5wJIUJxjGzxZ-0z/exec";
        fetch(`${logURL}?user=${encodeURIComponent(user)}&ip=${ip}`);
      });
  }

  const quizForm = document.getElementById("quiz-form");
  if (quizForm) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelectorAll(".feedback").forEach(el => el.textContent = "");
      let score = 0;
      const answers = { q1: "a", q2: "b", q3: "c" };
      for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const feedback = document.getElementById(`${q}-feedback`);
        if (!selected) {
          feedback.textContent = "❌ No answer selected.";
          feedback.style.color = "orange";
        } else if (selected.value === answers[q]) {
          feedback.textContent = "✅ Correct!";
          feedback.style.color = "green";
          score++;
        } else {
          feedback.textContent = "❌ Incorrect.";
          feedback.style.color = "red";
        }
      }
      document.getElementById("quiz-result").textContent = `You got ${score} out of ${Object.keys(answers).length} correct.`;
    });
  }
});
