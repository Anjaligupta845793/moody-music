"use client"
export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const bubbleClass = isUser 
    ? 'bg-blue-500 text-white ml-auto' 
    : 'bg-white text-gray-800 shadow-sm border border-gray-100';
  
  const alignmentClass = isUser ? 'justify-end' : 'justify-start';
  
  return (
    <div className={`flex ${alignmentClass} mb-4 animate-slideUp`}>
      <div className={`max-w-[70%] sm:max-w-[85%] ${bubbleClass} rounded-2xl px-4 py-3`}>
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
       {/*  <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp}
        </p> */}
      </div>
    </div>
  );
}