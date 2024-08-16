import React, { useState } from 'react';
import axios from 'axios';
// import './Chatai.css'; // Import the CSS file

const Chat = () => {
  const [question, setQuestions] = useState("");
  const [answer, setAnswers] = useState("");

  async function generateanswer() {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDPglACCrulnBIQsE9xuXA118rn16UiOQw",
        method: "post",
        data: { "contents": [{ "parts": [{ "text": `${question} in string chat without notation andcomments` }] }] },
      });
      setAnswers(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }

  return (
    <div className='body1'>

    <div className="chat-container">
      <h1 className="chat-title">Chat Box</h1>
      <textarea
        className="chat-input"
        value={question}
        onChange={(e) => setQuestions(e.target.value)}
        placeholder="Type your question here..."
        rows="10" 
        style={{fontSize:'20px'}}
      ></textarea>
      <button className="chat-button" onClick={generateanswer}>Generate Answer</button>
      {answer && <div className="chat-response">{answer}</div>}
    </div>
    </div>
  );
};

export default Chat;
