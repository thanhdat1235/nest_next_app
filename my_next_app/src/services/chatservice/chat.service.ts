import { io, Socket } from 'socket.io-client';
import { CHAT_API_URL } from "../urlApi";

const ChatService = {
  connect:async () => {
  const socket = io(CHAT_API_URL, {
    withCredentials: true
  });

  try {
    socket.on('connect', () => {
        console.log("Connected");
      });
  } catch (error) {
    console.log(error);
    
  }
}
  
};

export default ChatService;
