import React, { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]); // Store both user and bot messages
  const [inputMessage, setInputMessage] = useState(""); // Store input message
  const [isLoading, setIsLoading] = useState(false); // Loading state while fetching response

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return; // Avoid sending empty messages

    // Add user's message to the messages state
    const newMessage = { sender: "user", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Reset the input field
    setInputMessage("");

    // Send message to the bot and get the response
    getBotResponse(inputMessage);
  };

  const getBotResponse = (message) => {
    // Define the URL
    const url = `https://pythonapis.gitam.edu/chatbot?message=${message}`;

    // Define headers, including the Authorization token
    const headers = {
      Authorization: "Token c25182c06a50a01f48888a09ad50002d88724180",
    };

    setIsLoading(true); // Start loading

    // Perform the GET request using fetch
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Add bot's response to the messages state
        const botMessage = { sender: "bot", text: data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching chatbot response:", error);
        setIsLoading(false); // Stop loading on error
      });
  };
  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Chatbot</h1>
        <div style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.chatMessage,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#007bff" : "#e6e6e6",
                color: msg.sender === "user" ? "#fff" : "#000",
              }}
            >
              <span style={styles.senderLabel}>
                {msg.sender === "user" ? "You" : "Bot"}:
              </span>
              {msg.text}
            </div>
          ))}

          {isLoading && (
            <div style={styles.loadingMessage}>Bot is typing...</div>
          )}
        </div>

        {/* Input area for sending messages */}
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button style={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "400px",
    overflowY: "scroll",
    backgroundColor: "#f9f9f9",
  },
  chatMessage: {
    margin: "10px 0",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },
  senderLabel: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sendButton: {
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
  },
  loadingMessage: {
    alignSelf: "flex-start",
    fontStyle: "italic",
    color: "#888",
    margin: "10px 0",
  },
};
