import { useEffect, useRef, useState } from "react";
import api from "../../api/axiosInstance";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";

interface Conversation {
  conversationId: number;
  userName: string;
  lastMessage: string;
}

interface Message {
  id?: number;
  senderRole: string;
  content: string;
  timestamp?: string;
  senderId: number;
}

const PanditDashboard = () => {
    const currentRole = Number(localStorage.getItem("userId"));
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token");
 const currentUserId = Number(localStorage.getItem("userId"));
  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1️⃣ Fetch Conversations Assigned to Pandit
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get("/api/conversation");
        setConversations(res.data);
      } catch (err) {
        console.error("Failed to fetch conversations");
      }
    };

    fetchConversations();
  }, []);

  // 2️⃣ Fetch Messages When Conversation Selected
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(
          `/api/message/conversations/${selectedConversation.conversationId}/messages`,
          {
               params: {
          page: 0,
          size: 20,
        },
          }
        );
        
        setMessages(res.data.content.reverse());
      } catch (err) {
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // 3️⃣ WebSocket Connection
  useEffect(() => {
    if (!selectedConversation) return;

    const socket = new SockJS("https://panditprojects.onrender.com/wss");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(
          `/topic/conversation/${selectedConversation.conversationId}`,
          (message) => {
            const body = JSON.parse(message.body);
            setMessages((prev) => [...prev, body]);
          }
        );
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [selectedConversation]);

  // 4️⃣ Send Message
  const handleSend = () => {
    if (!input.trim() || !selectedConversation) return;

    const messageObj = {
    conversationId: selectedConversation.conversationId,  // string UUID is fine
    senderId: currentUserId,         // REQUIRED
    message: input
    };

    stompClientRef.current?.publish({
      destination: "/app/chat",
      body: JSON.stringify(messageObj),
    });

    setInput("");
    
  };

  return (
    
    <div className="h-screen flex bg-gray-100">

      {/* LEFT PANEL - Conversations */}
      <div className="w-1/3 bg-white border-r shadow-md overflow-y-auto">
        <div className="p-4 font-bold text-lg border-b">
          Assigned Conversations
        </div>

        {conversations.map((conv) => (
          <div
            key={conv.conversationId}
            onClick={() => setSelectedConversation(conv)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              selectedConversation?.conversationId === conv.conversationId
                ? "bg-gray-100"
                : ""
            }`}
          >
            <div className="font-semibold">{conv.userName}</div>
            <div className="text-sm text-gray-500 truncate">
              {conv.lastMessage}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL - Chat */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="p-4 border-b bg-white font-semibold">
          {selectedConversation
            ? `Chat with ${selectedConversation.userName}`
            : "Select a conversation"}
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
            
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.senderId === currentRole
                  ? "bg-primary text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >

              {msg.content}
            </div>
          ))
          }
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {selectedConversation && (
          <div className="p-4 border-t bg-white flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2"
              placeholder="Type your reply..."
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-6 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanditDashboard;