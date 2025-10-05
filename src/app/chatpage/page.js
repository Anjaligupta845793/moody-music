"use client"
import React, { useState, useEffect } from "react";
import MessageBubble from "@/components/MessageBubble";
import { useRouter } from "next/navigation";
import { chatPrompt } from "@/utills/prompts";
import { parseMusicData } from "@/utills/parse";
import { GenMusicPrompt } from "@/utills/prompts";

export default function Page() {
  const [usermessage, setusermessage] = useState("");
  const [isPlayerEnable, setisPlayerEnable] = useState(false);
  const [messages, setmessages] = useState([{ role: "system", content: chatPrompt }]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
   
    async function getInitialMessage() {
      try {
        const response = await fetch('/api/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(messages)
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.assistantMessage;
                
        if (assistantMessage) {
          setmessages(prev => [...prev, assistantMessage]);
        } else {
           throw new Error("No assistant message in API response.");
        }
      } catch (error) {
        console.error("Error fetching initial AI response:", error);
        const errorMessage = {
            role: "assistant",
            content: "Sorry, I couldn't connect right now. Please try refreshing the page."
        };
        setmessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false); 
      }
    }

    getInitialMessage();
  }, []); 

  const GoHome = () => {
    router.push("/");
  }

  const onInputChange = (e) => {
    setusermessage(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const onSendMessage = async () => {
    if (!usermessage.trim() || isLoading) return;

    const userMessage = { role: "user", content: usermessage };
    const newMessages = [...messages, userMessage];

    setmessages(newMessages); 
    setIsLoading(true);
    setusermessage("");

    try {
      
      const response = await fetch('/api/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessages) 
      });

      if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.assistantMessage;

      if (!assistantMessage) throw new Error("No assistant message returned");

      setmessages(prev => [...prev, assistantMessage]);
      setisPlayerEnable(true);

    } catch (err) {
      console.error("Error fetching response:", err);
      setmessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
        setIsLoading(false);
    }
  };

  
const onGenMusic = async () => {
  console.log("Generating music based on conversation...");

  try {   
    const musicRequestMessages = [
      ...messages,
      { role: "user", content: GenMusicPrompt }
    ];
  
    const res = await fetch('/api/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(musicRequestMessages)
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();
     
    const aiResponseContent = data?.assistantMessage?.content;
    if (!aiResponseContent) {
        throw new Error("AI response content is empty or missing.");
    }
    
   
    const parsedSongs = parseMusicData(aiResponseContent);

    if (parsedSongs.length === 0) {
               console.warn("Parsing resulted in an empty array. Check the AI's raw response.");
       
    }

    localStorage.setItem('apiData', JSON.stringify(parsedSongs));
    router.push("/songs");

  } catch (err) {
    console.error("Error in onGenMusic:", err);
   
  }
};
  return (
    <div className="h-screen bg-white flex flex-col">
       <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
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
        {/* We slice(1) to avoid displaying the system prompt to the user */}
        {messages.slice(1).map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {/* Show a typing indicator while loading */}
        {isLoading && <MessageBubble message={{role: 'assistant', content: '...'}} />}
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
            disabled={isLoading}
          />
          <button
            onClick={onSendMessage}
            disabled={isLoading || !usermessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:bg-gray-400 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
          <button
            onClick={onGenMusic}
            disabled={!isPlayerEnable}
            className={`${isPlayerEnable ? "bg-blue-500" : "bg-gray-400"} hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200`}
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