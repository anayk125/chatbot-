async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const userText = input.value.trim();

    if (!userText) return;

    chatbox.innerHTML += `<div class="user"><strong>You:</strong> ${userText}</div>`;
    input.value = "";

    chatbox.innerHTML += `<div class="bot"><strong>Bot:</strong> Thinking...</div>`;

    const apiKey = "AIzaSyBTE_l30ZX7V1_hZD03sj63WxT1KA_2jtg"; // 🔐 Replace this with your real OpenAI API key

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
