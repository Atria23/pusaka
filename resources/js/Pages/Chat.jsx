import { useState, useEffect, useRef } from 'react';

// Komponen Ikon untuk keterbacaan
const Icon = ({ path, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d={path} />
    </svg>
);

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatAreaRef = useRef(null);

    // Efek untuk otomatis menggulir ke bawah setiap kali percakapan diperbarui
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [conversation, loading]);
    
    // Fungsi untuk memulai percakapan baru
    const handleNewChat = () => {
        setConversation([]);
        setMessage('');
    };

    // Fungsi yang menangani pengiriman pesan (logika inti tetap sama)
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || loading) return;

        const userMessage = { sender: 'user', text: message };
        
        setConversation(prev => [...prev, userMessage]);
        setLoading(true);
        const currentMessage = message;
        setMessage('');

        try {
            const res = await fetch('/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ message: currentMessage }),
            });

            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            const aiMessage = { sender: 'ai', text: data.reply };
            setConversation(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Failed to fetch AI reply:", error);
            const errorMessage = { sender: 'ai', text: "Maaf, terjadi kesalahan saat menghubungi server." };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-utama">
    {/* Header */}
    <header className="shrink-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-main transition-colors p-2 rounded-lg"
        >
            <Icon path="M15 18l-6-6 6-6" />
            <span className="font-medium">Kembali</span>
        </button>
        <button 
            onClick={handleNewChat}
            className="flex items-center space-x-2 bg-[#4F8A75] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#2E5445] transition-colors"
        >
            <Icon path="M5 12h14 M12 5v14" />
            <span>Chat Baru</span>
        </button>
    </header>

    {/* Main Area Chat */}
    <main className="flex-1 overflow-hidden flex flex-col">
        <div ref={chatAreaRef} className="flex-1 overflow-y-auto p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Percakapan */}
                {conversation.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        {entry.sender === 'ai' && (
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#EAF3EF] text-[#2E5445] font-bold">TP</div>
                        )}
                        <div className={`p-4 rounded-lg max-w-xl shadow-sm ${entry.sender === 'user' ? 'ml-auto bg-[#4F8A75] text-white' : 'bg-white text-gray-800'}`}>
                            <p className="font-semibold capitalize">{entry.sender === 'user' ? 'You' : 'Tanya Pusaka'}</p>
                            <p className="mt-1 whitespace-pre-wrap">{entry.text}</p>
                        </div>
                        {entry.sender === 'user' && (
                            <img src="https://i.pravatar.cc/40?u=andrew" alt="User" className="w-8 h-8 rounded-full" />
                        )}
                    </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                    <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-[#EAF3EF] text-[#2E5445] font-bold">A</div>
                        <div className="p-4 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center justify-center space-x-1">
                                <span className="h-2 w-2 bg-[#4F8A75] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-[#4F8A75] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-[#4F8A75] rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </main>

    {/* Footer / Form Input */}
    <footer className="shrink-0 p-6 md:px-12 bg-gray-100 border-t">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ada pertanyaan?..."
                    className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F8A75] transition"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#4F8A75] text-white rounded-full hover:bg-[#2E5445] disabled:bg-[#7AB49A] disabled:cursor-not-allowed transition-colors"
                >
                    <Icon path="m22 2-7 20-4-9-9-4Z M22 2 11 13" />
                </button>
            </div>
        </form>
    </footer>
</div>

    );
}