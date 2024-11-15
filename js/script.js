    // Mostrar/ocultar el chatbot cuando se hace clic en el icono
    document.getElementById("chat-icon").addEventListener("click", function() {
        const chatContainer = document.getElementById("chat-container");
        // Alternar la visibilidad del chatbot
        chatContainer.style.display = chatContainer.style.display === "none" || chatContainer.style.display === "" ? "block" : "none";
    });

    document.getElementById("send-btn").addEventListener("click", function() {
        const userMessage = document.getElementById("user-input").value;
        if (userMessage.trim() !== "") {
            // Display user message (right aligned)
            const userMessageDiv = document.createElement("div");
            userMessageDiv.classList.add("message", "user");
            userMessageDiv.innerHTML = `<div class="content">${userMessage}</div>`;
            document.getElementById("chat-box").appendChild(userMessageDiv);
            
            // Clear input
            document.getElementById("user-input").value = "";

            // Simulate bot response (left aligned)
            setTimeout(function() {
                const botMessageDiv = document.createElement("div");
                botMessageDiv.classList.add("message", "bot");
                botMessageDiv.innerHTML = `<i class="bi bi-robot"></i><div class="content">¡Hola! ¿Cómo puedo ayudarte hoy?</div>`;
                document.getElementById("chat-box").appendChild(botMessageDiv);

                // Scroll to the bottom
                document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
            }, 1000);
        }
    });

    // Optional: Allow "Enter" to send message
    document.getElementById("user-input").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            document.getElementById("send-btn").click();
        }
    });