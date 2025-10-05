"use client"
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { api } from "@/utills/api";
import { chatPrompt } from "@/utills/prompts";
import MessageBubble from "@/components/MessageBubble";
import { useRouter } from "next/navigation";
import { GenMusicPrompt } from "@/utills/prompts";
import { parseMusicData } from "@/utills/parse";

export default function Page() {
  const [usermessage, setusermessage] = useState("")
  const [isPlayerEnable, setisPlayerEnable] = useState(false)   
  const [messages, setmessages] = useState([])
  const router = useRouter();


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/systemapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{role:"system",content:chatPrompt}])
    });

    const res = await response.json();

        console.log("Full API Response:", res);
        console.log("Response data:", res?.data);

        const assistantMessage = res?.data?.choices?.[0]?.message;

        console.log("Assistant message:", assistantMessage);

        setmessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }

    fetchData(); // Call the async function
  }, []); // Runs once

  
  const GoHome = () => {
      router.push("/")
  }

  const onInputChange = (e) => {
    setusermessage(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSendMessage();
    }
  };

 const onSendMessage = async () => {
  if (!usermessage.trim()) return;

  const userMessage = { role: "user", content: usermessage };

  // Add user message to chat
  setmessages(prev => [...prev, userMessage]);

  // Clear input
  setusermessage("");

  try {
    // Send updated messages to server API route
    const res = await fetch('/api/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ role: "user", content: messages }])
    });

    const data = await res.json();
    const assistantMessage = data.assistantMessage;

    if (!assistantMessage) throw new Error("No assistant message returned");

    // Add assistant response to chat
    setmessages(prev => [...prev, assistantMessage]);

    setisPlayerEnable(true);
    console.log("Generated Response:", assistantMessage.content);

  } catch (err) {
    console.error("Error fetching response:", err);

    // Add error message to chat
    setmessages(prev => [...prev, {
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again."
    }]);
  }
};

 const onGenMusic = async () => {
  const res = await fetch('/api/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([{role:"user" , content:chatPrompt },...messages])
  });

  const data = await res.json();
  const parsedSongs = parseMusicData(data.songsString);

  localStorage.setItem('apiData', JSON.stringify(parsedSongs));
  router.push("/songs");
}
  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="bg-white border-b border-gray-200  px-4 py-4 flex items-center justify-between">
        <button 
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={GoHome}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div className="text-center">
          <h2 className="font-semibold text-gray-800">Mood Chat</h2>
          <p className="text-sm text-gray-500">Here to listen</p>
        </div>
        
        <div className="w-6"></div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto bg-gray-50 md:px-20 px-4 py-6 scroll-smooth">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 md:px-20 px-5 py-4">
        <div className="flex items-center space-x-3">
          <input 
            type="text" 
            value={usermessage}
            onChange={onInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your reply…" 
            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            autoComplete="off"
          />
          <button 
            onClick={onSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
          <button 
            onClick={onGenMusic}
            disabled={!isPlayerEnable}
            className={`${isPlayerEnable ?" bg-blue-500" : "bg-gray-400"}  hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200`}
          >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-2c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 6l12-3"
            />
          </svg>

        

          </button>
        </div>
      </div>
    </div>
  );
}