window.addEventListener("DOMContentLoaded", () => {
  // Google Sheets logging
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  if (user) {
    const loggingURL = "https://script.google.com/macros/s/AKfycbyW0Mvq5FcscFJDdO3e7A9SnLY0owpnLPtFRy9vjEHon-VZmPn9x5wJIUJxjGzxZ-0z/exec";
    fetch(`${loggingURL}?user=${encodeURIComponent(user)}`);
  }

  // Quiz handler
  const quizForm = document.getElementById("quiz-form");

  if (quizForm) {
    quizForm.addEventListener("submit", function (e) {
      e.preventDefault(); // ✅ Prevents page from reloading

      // Clear previous feedback
      document.querySelectorAll(".feedback").forEach(el => el.textContent = "");

      let score = 0;

      const answers = {
        q1: "a",
        q2: "b",
        q3: "c"
      };

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
