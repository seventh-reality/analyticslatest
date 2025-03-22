let animations = ["Idle", "Wave", "Jump"];
let currentAnimation = 0;

function toggleChat() {
  let chatContainer = document.getElementById("chat-container");
  chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
}

async function sendMessage() {
  let userMessage = document.getElementById("user-input").value.trim();
  if (!userMessage) return;

  let chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;

  try {
    let botMessage = await getBotResponse(userMessage);
    chatBox.innerHTML += `<p><b>Bot:</b> ${botMessage}</p>`;

    let modelViewer = document.getElementById("humanModel");
    modelViewer.setAttribute("animation-name", animations[currentAnimation]);
    currentAnimation = (currentAnimation + 1) % animations.length;

    let utterance = new SpeechSynthesisUtterance(botMessage);
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Error fetching bot response:", error);
    chatBox.innerHTML += `<p><b>Bot:</b> Sorry, something went wrong.</p>`;
  }

  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error("Fetch error:", error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
}
