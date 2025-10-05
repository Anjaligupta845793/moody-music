"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const GotoChatpage = () => {
     router.push("/chatpage")
  }
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-bounce-gentle">
            <span className="text-4xl">💭</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Share Your Mood, Get a Song ✨
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Open up about how you’re feeling, and I’ll recommend the perfect songs to match your mood or lift your spirits in a safe, welcoming space.
        </p>
        
        <button 
         onClick={GotoChatpage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Start Conversation
        </button>
      </div>
    </div>
  );
}
