async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const userText = input.value.trim();

    if (!userText) return;

    chatbox.innerHTML += `<div class="user"><strong>You:</strong> ${userText}</div>`;
    input.value = "";

    chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> Thinking...</div>`;

    const apiKey = "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"; // 🔐 Replace this with your real OpenAI API key

    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Answer about cyber security: ${userText}`,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const botReply = data.choices?.[0]?.text.trim() || "Sorry, I couldn't understand.";

        chatbox.lastChild.remove();
        chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> ${botReply}</div>`;
        chatbox.scrollTop = chatbox.scrollHeight;

    } catch (error) {
        chatbox.lastChild.remove();
        chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> Error: ${error.message}</div>`;
    }
}