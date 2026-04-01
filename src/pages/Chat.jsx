import { useState } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "👋 I am your AI Coach. Ask me anything about self-improvement.", sender: "ai" }
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);

    // 🧠 Advanced AI Brain
    const getAIResponse = (msg) => {
        msg = msg.toLowerCase();

        if (msg.includes("lazy") || msg.includes("procrastination"))
            return "You don’t need motivation. Start with 1 small task. Action creates momentum.";

        if (msg.includes("confidence"))
            return "Confidence is built, not given. Do 1 uncomfortable thing daily.";

        if (msg.includes("focus"))
            return "Remove distractions. Work in 25-minute deep focus sessions.";

        if (msg.includes("failure"))
            return "Failure is feedback. Adjust strategy, not your goal.";

        if (msg.includes("discipline"))
            return "Discipline = doing it even when you don’t feel like it.";

        if (msg.includes("communication"))
            return "Listen more than you speak. Clarity beats complexity.";

        if (msg.includes("motivation"))
            return "Motivation fades. Systems stay. Build daily habits.";

        return "Improve 1% today. That’s how real growth happens.";
    };

    // 📤 Send Message
    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        setTyping(true);

        setTimeout(() => {
            const aiMessage = {
                text: getAIResponse(input),
                sender: "ai",
            };

            setMessages((prev) => [...prev, aiMessage]);
            setTyping(false);
        }, 800); // typing delay
    };

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            background: "#F3F4F6",
            minHeight: "100vh",
            fontFamily: "Segoe UI",
        },

        heading: {
            textAlign: "center",
            color: "#4F46E5",
            marginBottom: "15px",
        },

        chatBox: {
            height: "400px",
            overflowY: "auto",
            padding: "10px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            marginBottom: "10px",
        },

        message: (sender) => ({
            textAlign: sender === "user" ? "right" : "left",
            margin: "8px 0",
        }),

        bubble: (sender) => ({
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: "16px",
            maxWidth: "70%",
            background:
                sender === "user"
                    ? "linear-gradient(135deg, #4F46E5, #22C55E)"
                    : "#E5E7EB",
            color: sender === "user" ? "white" : "#111",
        }),

        inputBox: {
            display: "flex",
            gap: "10px",
        },

        input: {
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
        },

        button: {
            background: "#4F46E5",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
        },

        typing: {
            fontStyle: "italic",
            color: "#777",
            margin: "5px",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>🤖 AI Coach</h2>

            {/* 💬 Chat */}
            <div style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message(msg.sender)}>
                        <span style={styles.bubble(msg.sender)}>
                            {msg.text}
                        </span>
                    </div>
                ))}

                {typing && <p style={styles.typing}>AI is typing...</p>}
            </div>

            {/* ✍️ Input */}
            <div style={styles.inputBox}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about focus, discipline, confidence..."
                    style={styles.input}
                />

                <button onClick={handleSend} style={styles.button}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;