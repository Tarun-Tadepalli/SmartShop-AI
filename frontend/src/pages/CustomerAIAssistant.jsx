import React, { useState, useRef, useEffect } from "react";
import CustomerLayout from "../components/CustomerLayout";
import { askAI } from "../services/aiApi";
import "../styles/ai.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CustomerAIAssistant() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hello! Welcome to SmartShop AI.\n\nHow can I help you today?"
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
            console.log("QUESTION");
            console.log(question);

            console.log("HISTORY");
            console.log(history);

            console.log("REQUEST BODY");
            console.log({
            question,
            history
            });
            
            const response = await askAI(question, history);
            const aiMessage = {sender: "ai",
            text: response.data.response
            ? response.data.response
            : "⚠️ Sorry, I couldn't process that. Please try again."
            };

            setMessages((prev) => [
            ...prev,
            aiMessage
            ]);

        }
        catch(error){

            console.log("FULL ERROR");
            console.log(error);
        
            if(error.response){
                console.log(error.response.data);
                console.log(error.response.status);
            }
        
            if(error.request){
                console.log(error.request);
            }
        
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

      <CustomerLayout>

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

                      🤖 SmartShop AI Assistant

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

                      placeholder="Ask anything about SmartShop..."

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
          </CustomerLayout>

);

}

export default CustomerAIAssistant;