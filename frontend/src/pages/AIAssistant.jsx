import React, { useState, useRef, useEffect } from "react";
import MainLayout from "../components/Mainlayout";
import { askAdminAI } from "../services/admin_aiApi";
import "../styles/ai.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CustomerAIAssistant() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hello! Welcome to SmartShop Admin AI.\n\nHow can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    const sendMessage = async () => {

        if (question.trim() === "") return;

        const userMessage = {
            sender: "user",
            text: question
        };

        const userEmail = localStorage.getItem("userEmail");

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setLoading(true);

        try {

            const updatedMessages = [
                ...messages,
                userMessage
            ];
            
            const history = [
                {
                    role: "email",
                    text: userEmail
                },
            
                ...updatedMessages.map((msg) => ({
                    role: msg.sender === "user"
                        ? "user"
                        : "assistant",
            
                    text: msg.text
                }))
            ];
            
            const response = await askAdminAI(question, history);
            
            const aiMessage = {
                sender: "ai",
                text: response.data.response
                    ? response.data.response
                    : "⚠️ Sorry, I couldn't process that. Please try again."
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

        }
        catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "❌ Unable to connect to SmartShop AI."
                }
            ]);

        }

        setLoading(false);

        setQuestion("");

    };

    const clearChat = () => {

        setMessages([
            {
                sender: "ai",
                text: "👋 Hello! Welcome to SmartShop AI.\n\nHow can I help you today?"
            }
        ]);

    };
    const handleKeyDown = (event) => {

      if (event.key === "Enter") {

          sendMessage();

      }

  };

  return (

      <MainLayout>

          <div className="chat-card">

              <div
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px"
                  }}
              >

                  <h2>

                      🤖 SmartShop Admin AI

                  </h2>

                  <button

                      onClick={clearChat}

                      style={{

                          background: "#ef4444",

                          color: "white",

                          border: "none",

                          padding: "10px 18px",

                          borderRadius: "8px",

                          cursor: "pointer"

                      }}

                  >

                      Clear Chat

                  </button>

              </div>

              <div className="chat-messages">

                  {

                      messages.map((msg, index) => (

                        <div

                        key={index}
                        
                        className={
                        msg.sender === "user"
                        ? "message user-message"
                        : "message ai-message"
                        }
                        >
                        
                        {
                        msg.sender === "user"
                        ?
                        
                        msg.text
                        
                        :
                        
                        <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        >
                        
                        {msg.text}
                        
                        </ReactMarkdown>
                        
                        }
                        
                        </div>

                      ))

                  }

                  {

                      loading && (

                          <div className="message ai-message">

                              🤖 Thinking...

                          </div>

                      )

                  }

                  <div ref={bottomRef}></div>

              </div>

              <div className="chat-input">

                  <input

                      type="text"

                      placeholder="Ask SmartShop Admin AI..."

                      value={question}

                      onChange={(e) =>
                          setQuestion(e.target.value)
                      }

                      onKeyDown={handleKeyDown}

                  />

                  <button

                      onClick={sendMessage}

                  >

                      Send

                  </button>

              </div>

          </div>
          </MainLayout>

);

}

export default CustomerAIAssistant;