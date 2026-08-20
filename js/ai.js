// ======================================
// BLOOM AI ASSISTANT
// ======================================

// Elements
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const mockTopicInput = document.getElementById("mockTopic");
const generateMockBtn = document.getElementById("generateMockBtn");

// Chat History
let chatHistory =
JSON.parse(localStorage.getItem("bloomAIChat")) || [];

// ======================================
// SAVE CHAT
// ======================================

function saveChat() {

    localStorage.setItem(
        "bloomAIChat",
        JSON.stringify(chatHistory)
    );

}

// ======================================
// SEND MESSAGE
// ======================================

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

function sendMessage() {

    const message = input.value.trim();

    if (message === "") {

        return;

    }

    // User Message

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    chatHistory.push({

        sender: "user",

        message: message

    });

    saveChat();

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;

    // Typing Animation

    const typingId = "typing-" + Date.now();

    chatBox.innerHTML += `
        <div class="ai-message" id="${typingId}">
            🤖 Bloom AI is typing...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    // AI Reply

    setTimeout(function () {

        const reply = getAIResponse(message);

        document.getElementById(typingId).innerHTML =
            "🤖 " + reply;

        chatHistory.push({

            sender: "ai",

            message: reply

        });

        saveChat();

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1000);

}

// ======================================
// AI RESPONSES
// ======================================

function getAIResponse(message) {

    const text = message.toLowerCase();

    if (text.includes("binary")) {

        return "Binary Search is a searching algorithm that works on a sorted array. It repeatedly divides the search space into half until the element is found.";

    }

    else if (text.includes("python")) {

        return "Python is an easy-to-learn programming language used in AI, web development, automation, and data science.";

    }

    else if (text.includes("study") || text.includes("revision") || text.includes("plan")) {

        return "📚 Study Tip: Use the Pomodoro Technique (25 minutes study + 5 minutes break) to improve focus and memory.";

    }

    else if (text.includes("fitness") || text.includes("health")) {

        return "💪 Fitness Tip: Drink at least 8 glasses of water and exercise for 30 minutes daily.";

    }

    else if (text.includes("motivate") || text.includes("confidence")) {

        return "🌸 Success comes from consistency, not perfection. Keep learning every day!";

    }

    else if (text.includes("hello") || text.includes("hi")) {

        return "👋 Hello! I'm Bloom AI. How can I help you today?";

    }

    else {

        return "😊 That's a great question! I can help with revision notes, mock tests, coding explanations, and study plans.";

    }

}

// ======================================
// QUICK BUTTONS
// ======================================

const quickButtons = document.querySelectorAll(".quick-buttons button");

quickButtons.forEach(button => {

    button.addEventListener("click", function () {

        const prompt = this.dataset.prompt || this.innerText;
        input.value = prompt;
        sendMessage();

    });

});

function renderMockQuestions(topic) {

    const questions = generateMockQuestions(topic, 3);

    const quizMarkup = questions.map((item) => `
        <div class="quiz-card">
            <strong>${item.question}</strong>
            <ul>
                ${item.options.map((option) => `<li>${option}</li>`).join("")}
            </ul>
            <p><strong>Answer:</strong> ${item.answer}</p>
        </div>
    `).join("");

    chatBox.innerHTML += `
        <div class="ai-message">
            🧪 Mock quiz generated for <strong>${topic}</strong>.<br><br>
            ${quizMarkup}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

generateMockBtn.addEventListener("click", function () {

    const topic = mockTopicInput.value.trim() || "General Study";

    chatHistory.push({
        sender: "user",
        message: `Generate mock quiz for ${topic}`
    });

    chatHistory.push({
        sender: "ai",
        message: `Mock quiz generated for ${topic}`
    });

    saveChat();
    renderMockQuestions(topic);
    mockTopicInput.value = "";

});

// ======================================
// LOAD CHAT
// ======================================

function loadChat() {

    if (chatHistory.length === 0) {

        return;

    }

    chatBox.innerHTML = "";

    chatHistory.forEach(chat => {

        if (chat.sender === "user") {

            chatBox.innerHTML += `
                <div class="user-message">
                    ${chat.message}
                </div>
            `;

        }

        else {

            chatBox.innerHTML += `
                <div class="ai-message">
                    🤖 ${chat.message}
                </div>
            `;

        }

    });

    chatBox.scrollTop = chatBox.scrollHeight;

}

loadChat();


// ======================================
// CLEAR CHAT
// ======================================

const clearChatBtn = document.getElementById("clearChat");

clearChatBtn.addEventListener("click", function () {

    if (confirm("Are you sure you want to clear all chat?")) {

        // Clear Local Storage
        localStorage.removeItem("bloomAIChat");

        // Clear Array
        chatHistory = [];

        // Reset Chat Box
        chatBox.innerHTML = `
            <div class="ai-message">
                👋 Hello! I'm <strong>Bloom AI</strong>.
                <br><br>
                How can I help you today?
            </div>
        `;

    }

});