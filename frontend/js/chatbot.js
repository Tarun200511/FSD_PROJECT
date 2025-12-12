const chatRules = {
    'hello': 'Hi there! Welcome to WishVipe. How can I help you today?',
    'hi': 'Hello! Ready to shop?',
    'products': 'We have a wide range of products including Electronics, Fashion, Home, and Sports items.',
    'payment': 'We accept Stripe and Credit Cards.',
    'shipping': 'We offer free shipping on orders over $100.',
    'contact': 'You can contact us at support@wishvipe.com.',
    'default': 'I am sorry, I did not understand that. You can ask about products, payment, or shipping.'
};

const toggleChat = () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' || chatBox.style.display === '' ? 'flex' : 'none';
};

const sendMessage = () => {
    const input = document.getElementById('chat-input');
    const message = input.value.trim().toLowerCase();
    if (!message) return;

    addMessage(input.value, 'user');
    input.value = '';

    setTimeout(() => {
        const response = chatRules[message] || chatRules[Object.keys(chatRules).find(key => message.includes(key))] || chatRules['default'];
        addMessage(response, 'bot');
    }, 500);
};

const addMessage = (text, sender) => {
    const messages = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
};

// Create Chat UI
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <div id="chat-icon" onclick="toggleChat()">
            <i class="fas fa-comments"></i>
        </div>
        <div id="chat-box">
            <div class="chat-header">
                <span>WishVipe Support</span>
                <span onclick="toggleChat()" style="cursor: pointer;">&times;</span>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type a message...">
                <button onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatContainer);

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
