// Chatbot functionality with improved error handling
async function getChatbotResponse(message) {
    try {
        console.log("[DEBUG] Sending message:", message);
        
        const API_BASE_URL = window.location.hostname === 'localhost' 
            ? 'http://localhost:5000' 
            : '';
        
        // Show typing indicator
        const messagesDiv = document.querySelector('.messages');
        messagesDiv.innerHTML += `<div class="typing-indicator">Bot is typing...</div>`;
        
        const response = await fetch(`${API_BASE_URL}/chatbot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        // Remove typing indicator
        document.querySelector('.typing-indicator')?.remove();
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.response) {
            // Try fallback to local responses if server returns empty
            return getFallbackResponse(message);
        }
        
        return data.response;
    } catch (error) {
        console.error("[ERROR] Chatbot error:", error);
        // Fallback to local responses if server fails
        return getFallbackResponse(message);
    }
}

async function getFallbackResponse(message) {
    try {
        // Load FAQ data
        const response = await fetch('faq.csv');
        const csvData = await response.text();
        
        // Parse CSV
        const lines = csvData.split('\n');
        const faq = {};
        
        for (let i = 1; i < lines.length; i++) {
            const [question, answer] = lines[i].split(',');
            if (question && answer) {
                faq[question.toLowerCase()] = answer;
            }
        }

        // Check for direct question match
        const lowerMsg = message.toLowerCase();
        if (faq[lowerMsg]) {
            return faq[lowerMsg];
        }

        // Check for keyword matches
        for (const [question, answer] of Object.entries(faq)) {
            if (lowerMsg.includes(question.toLowerCase())) {
                return answer;
            }
        }

        // Default response if no match found
        return "I found this in our FAQ: " + 
               "You can return items within 7 days of delivery. " + 
               "For more details, please visit our Returns Policy page.";
    } catch (error) {
        console.error("Error loading FAQ:", error);
        return "I apologize, but I'm having trouble accessing our FAQ. " + 
               "Our standard return policy allows returns within 7 days of delivery.";
    }
}

// Update the existing sendMessage function to use our fixed version
async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.querySelector('.messages');

    if (!userInput) return;

    // Display user message
    messagesDiv.innerHTML += `<div>User: ${userInput}</div>`;

    try {
        const botResponse = await getChatbotResponse(userInput);
        messagesDiv.innerHTML += `<div>Bot: ${botResponse}</div>`;
    } catch (error) {
        messagesDiv.innerHTML += `<div>Bot: Error - ${error.message}</div>`;
    }

    document.getElementById('userInput').value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
