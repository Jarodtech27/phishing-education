window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  if (user) {
    const webhookURL = "https://discord.com/api/webhooks/1387868562420531311/gILUsx4X-vuz_2EUVzvgqol3JrT2D6lEmLTOpRMQIxM8d6eqVIIWSAwoihh4TNKpgDCP";

    fetch(webhookURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `🚨 **Phishing Click Detected!**\n👤 **User:** \`${user}\`\n🕒 **Time:** ${new Date().toLocaleString()}`
      })
    }).then(() => {
      console.log("✅ Click alert sent to Discord.");
    }).catch((error) => {
      console.error("❌ Error sending webhook:", error);
    });
  }
});

