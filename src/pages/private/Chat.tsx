import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Message {
  id?: string;
  senderId: number;
  content: string;
  timestamp?: string;
}

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { conversationId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem("token");
  const currentUserId = Number(localStorage.getItem("userId"));

  // 🔁 Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🧱 Load initial messages (REST)
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/message/conversations/${conversationId}/messages`, {
          params: { page: 0, size: 50 },
        });

        const content = Array.isArray(res.data.content.reverse())
          ? res.data.content
          : [];

        setMessages(content);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // 🔌 WebSocket connection
  useEffect(() => {
    if (!conversationId || !token) return;

    const socket = new SockJS("https://panditprojects.onrender.com/wss");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        stompClient.subscribe(
          `/topic/conversation/${conversationId}`,
          (message) => {
            const body: Message = JSON.parse(message.body);

            setMessages((prev) => [...prev, body]);
          }
        );
      },
      onDisconnect: () => {
       setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [conversationId, token]);

  // ✉️ Send message
  const handleSend = () => {
    if (!input.trim() || !conversationId) return;
  if (!isConnected) {
    console.warn("STOMP not connected yet");
    return;
  }
    const messagePayload = {
    conversationId: conversationId,  // string UUID is fine
    senderId: currentUserId,         // REQUIRED
    message: input
    };

    stompClientRef.current?.publish({
      destination: "/app/chat",
      body: JSON.stringify(messagePayload),
    });

    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <div className="p-4 bg-white border-b font-semibold">
        Conversation ID: {conversationId}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.senderId === currentUserId
                ? "bg-primary text-white ml-auto"
                : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-3">
        <input
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          disabled={!isConnected}
          onClick={handleSend}
          className={`px-6 rounded-lg ${
            isConnected
              ? "bg-primary text-white"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;