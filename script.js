const OPENAI_API_KEY = "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"; // Replace with your OpenAI API key

let animations = ["Idle", "Wave", "Jump"];
let currentAnimation = 0;
let speaking = false;

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

    // Start animation
    modelViewer.setAttribute("animation-name", animations[currentAnimation]);
    modelViewer.play();
    currentAnimation = (currentAnimation + 1) % animations.length;

    // Speech synthesis
    let utterance = new SpeechSynthesisUtterance(botMessage);
    utterance.onstart = () => { speaking = true; };
    utterance.onend = () => { speaking = false; modelViewer.pause(); };
    
    speechSynthesis.speak(utterance);
    
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotResponse(userMessage) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
