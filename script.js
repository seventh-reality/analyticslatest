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

  let botMessage = await getBotResponse(userMessage);
  chatBox.innerHTML += `<p><b>Bot:</b> ${botMessage}</p>`;

  let modelViewer = document.getElementById("humanModel");
  modelViewer.setAttribute("animation-name", animations[currentAnimation]);
  currentAnimation = (currentAnimation + 1) % animations.length;

  let utterance = new SpeechSynthesisUtterance(botMessage);
  speechSynthesis.speak(utterance);
  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  return data.reply || "Sorry, I couldn't understand that.";
}
