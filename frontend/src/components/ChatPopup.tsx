import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "Hi, I'm your social strategy assistant. Ask me about content ideas, captions, hashtags, or posting schedules.",
  },
];

function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: newMessages }),
      });

      const data = await response.json();
      const reply = data.reply || 'I am here to help with social strategy ideas and content planning.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'I am not available right now, but I can still help with a quick content idea or strategy prompt.' }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button className="chat-launcher" onClick={() => setOpen(true)}>
          Ask Strategist
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Ask Strategist</span>
            <button className="close-button" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
                <div className="chat-bubble">{message.content}</div>
              </div>
            ))}
            {typing && <div className="chat-message bot"><div className="chat-bubble typing">Typing...</div></div>}
          </div>

          <div className="chat-composer">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about content ideas..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatPopup;
