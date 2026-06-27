import MainLayout from "../components/MainLayout";
import "../styles/ai.css";

function AIAssistant() {
  return (
    <MainLayout>

      <h1>
        AI Assistant
      </h1>

      <br />

      <div className="chat-card">

        <div className="chat-messages">

          <div className="message user-message">
            Suggest laptops under ₹50000
          </div>

          <div className="message ai-message">
            Here are some laptops under ₹50000...
          </div>

        </div>

        <div className="chat-input">

          <input
            placeholder="Ask AI..."
          />

          <button>
            Send
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default AIAssistant;