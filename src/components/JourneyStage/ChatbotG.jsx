import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Knowledge Base with predefined responses
const knowledgeBase = { 
  'initial assessment': { 
    response: 'The initial assessment for NMOSD includes clinical and diagnostic evaluations. Key points:', 
    details: [ 
      '• MRI scans for lesions in the optic nerves and spinal cord', 
      '• Blood tests for AQP4-IgG antibodies', 
      '• Differential diagnosis to exclude other demyelinating disorders', 
      '• Comprehensive review of patient history and symptoms' 
    ] 
  }, 
  'eligibility': { 
    response: 'Eligibility for NMOSD therapies is determined by the following factors:', 
    details: [ 
      '• Confirmed diagnosis of NMOSD with AQP4-IgG seropositivity', 
      '• History of at least one clinical attack meeting NMOSD diagnostic criteria', 
      '• Exclusion of multiple sclerosis and other conditions', 
      '• Age and other comorbidities may influence therapy selection' 
    ] 
  }, 
  'insurance': { 
    response: 'Insurance coverage for NMOSD treatments involves:', 
    details: [ 
      '• Prior authorization required for biologic therapies', 
      '• Coverage typically varies based on regional and provider policies', 
      '• Average approval time is approximately 21 days', 
      '• Support programs are available for co-pay and out-of-pocket costs' 
    ] 
  }, 
  'side effects': { 
    response: 'Important information about managing side effects of NMOSD treatments:', 
    details: [ 
      '• Regular monitoring for infusion-related reactions', 
      '• Liver function and immune suppression monitoring', 
      '• Vigilance for signs of infections due to immunosuppression', 
      '• Patient education on recognizing early warning signs of complications' 
    ] 
  } 
};

const ChatbotButtonG = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I can help you understand the patient journey for NMOSD. What would you like to know about?", 
      sender: 'bot',
      options: [
        'Initial Assessment Process',
        'Treatment Eligibility',
        'Insurance Coverage', 
        'Side Effects Management'
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleOptionClick = (option) => {
    const optionMap = {
      'Initial Assessment Process': 'initial assessment',
      'Treatment Eligibility': 'eligibility',
      'Insurance Coverage': 'insurance',
      'Side Effects Management': 'side effects'
    };

    const knowledgeBaseKey = optionMap[option];
    
    const newMessages = [
      ...messages, 
      { 
        id: messages.length + 1, 
        text: option, 
        sender: 'user' 
      }
    ];

    if (knowledgeBaseKey && knowledgeBase[knowledgeBaseKey]) {
      const entry = knowledgeBase[knowledgeBaseKey];
      
      const botResponse = {
        id: messages.length + 2,
        text: entry.response,
        sender: 'bot',
        details: entry.details,
        options: [
          'Initial Assessment Process',
          'Treatment Eligibility',
          'Insurance Coverage', 
          'Side Effects Management'
        ]
      };

      setMessages([...newMessages, botResponse]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newUserMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user'
    };
    setMessages([...messages, newUserMessage]);

    const botResponse = {
      id: messages.length + 2,
      text: `I received: "${message}". Would you like to explore one of these options?`,
      sender: 'bot',
      options: [
        'Initial Assessment Process',
        'Treatment Eligibility',
        'Insurance Coverage', 
        'Side Effects Management'
      ]
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={handleChatToggle}
          className="bg-[#004567] text-white p-4 rounded-full shadow-2xl hover:bg-[#004567] transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-[100] transition-transform duration-300 ease-in-out 
          ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="bg-[#004567] text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold text-lg">AI Assistant</h3>
          <button 
            onClick={handleChatToggle}
            className="hover:bg-[#004567] p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 h-[calc(100%-200px)] overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  msg.sender === 'user' 
                    ? 'bg-[#004567] text-white self-end ml-auto' 
                    : 'bg-[#004567]/50 self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
              
              {msg.details && (
                <div className="ml-4 mt-2 space-y-1">
                  {msg.details.map((detail, idx) => (
                    <div 
                      key={idx} 
                      className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              )}
              
              {msg.options && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="bg-[#004567]/70 text-white px-3 py-1 rounded-full text-sm hover:bg-[#004567]"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t flex items-center gap-2">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004567]"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            className="bg-[#004567] text-white p-2 rounded-full hover:bg-[#004567] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotButtonG;
