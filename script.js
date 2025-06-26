// script.js - Synergy Medical Group Phishing Training Page
if (location.protocol === 'http:') {
  location.href = location.href.replace('http:', 'https:');
}
const params = new URLSearchParams(window.location.search);
const user = params.get('user');
if (user) {
  document.getElementById('personal-greeting').innerText = `Hello ${decodeURIComponent(user)}, thanks for completing your phishing awareness training.`;
}
const translations = {
  en: {
    'Phishing Simulation Detected': 'Phishing Simulation Detected',
    'This was part of an internal cybersecurity training by Synergy Medical Group.': 'This was part of an internal cybersecurity training by Synergy Medical Group.'
  },
  es: {
    'Phishing Simulation Detected': 'Simulación de Phishing Detectada',
    'This was part of an internal cybersecurity training by Synergy Medical Group.': 'Esto fue parte de una capacitación interna de ciberseguridad de Synergy Medical Group.'
  }
};
function setLanguage(lang) {
  const keys = Object.keys(translations[lang]);
  keys.forEach(text => {
    const els = Array.from(document.querySelectorAll('*')).filter(el => el.textContent.trim() === text);
    els.forEach(el => (el.textContent = translations[lang][text]));
  });
}
const quizForm = document.getElementById('quiz-form');
quizForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  let score = 0;
  const answers = quizForm.querySelectorAll('input[type="radio"]:checked');
  answers.forEach(a => {
    if (a.value === 'correct') score++;
  });
  document.getElementById('quiz-result').innerText = `You got ${score}/3 correct.`;
});
