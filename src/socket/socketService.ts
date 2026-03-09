import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: Client | null = null;

export const connectSocket = (onMessageReceived: (msg: any) => void) => {

  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {

      stompClient?.subscribe("/topic/messages", (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
      });

    },
  });

  stompClient.activate();
};

export const sendMessage = (message: any) => {
  stompClient?.publish({
    destination: "/app/chat",
    body: JSON.stringify(message),
  });
};

export const disconnectSocket = () => {
  stompClient?.deactivate();
};