window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  if (user) {
    const loggingURL = "https://script.google.com/macros/s/AKfycbyW0Mvq5FcscFJDdO3e7A9SnLY0owpnLPtFRy9vjEHon-VZmPn9x5wJIUJxjGzxZ-0z/exec";

    fetch(`${loggingURL}?user=${encodeURIComponent(user)}`)
      .then(res => console.log("✅ User logged to Google Sheets"))
      .catch(err => console.error("❌ Logging error:", err));
  }
});
