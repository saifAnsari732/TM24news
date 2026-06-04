import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "नमस्ते! मैं TM24news का AI असिस्टेंट हूँ। मैं आपको न्यूज़ का टाइटल, कीवर्ड्स और कंटेंट लिखने में मदद कर सकता हूँ। आप मुझसे क्या पूछना चाहेंगे?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (skip intro and errors)
      const validMessages = messages.filter(m => 
        !m.isError && 
        !(m.sender === 'bot' && m.text.includes("नमस्ते! मैं TM24news का AI असिस्टेंट हूँ"))
      );

      // Ensure alternating roles by grouping consecutive messages from the same sender
      const contents = [];
      let currentRole = null;
      let currentParts = [];

      [...validMessages, { text: userMessage, sender: 'user' }].forEach(m => {
        const role = m.sender === 'user' ? 'user' : 'model';
        if (role === currentRole) {
          currentParts.push({ text: m.text });
        } else {
          if (currentRole) {
            contents.push({ role: currentRole, parts: currentParts });
          }
          currentRole = role;
          currentParts = [{ text: m.text }];
        }
      });
      if (currentRole) {
        contents.push({ role: currentRole, parts: currentParts });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `API Error: ${response.status}`);
      }

      if (data.candidates && data.candidates.length > 0) {
        const botMessage = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { text: botMessage, sender: 'bot' }]);
      } else {
        throw new Error('No valid response from API');
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { text: `क्षमा करें, मुझे सर्वर से कनेक्ट करने में समस्या हो रही है। (${error.message})`, sender: 'bot', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm w-full flex flex-col border border-zinc-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <h3 className="font-bold text-lg">AI Assistant</h3>
        </div>
      </div>

      {/* Chat Area */}
      
      <div 
        ref={containerRef}
        className="h-[550px] overflow-y-auto p-4 space-y-4 bg-zinc-50"
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-sm'}`}>
              {msg.sender === 'bot' ? (
                <div className="prose prose-sm prose-p:my-1 prose-a:text-blue-600 max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*/g, '').replace(/\n/g, '<br/>') }} />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2 flex-row">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3 bg-white border border-zinc-200 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-zinc-500" />
              <span className="text-sm text-zinc-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="यहाँ टाइप करें..."
          className="flex-1 px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 text-white p-2.5 rounded-xl transition-all flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
