import { io, Socket } from "socket.io-client";
import { CHAT_API_URL } from "../urlApi";

const socket = io(CHAT_API_URL, {
  withCredentials: true,
});

const ChatService = {
  connect: async () => {

    try {
      socket.on("connect", () => {
        console.log("Connected");
      });
    } catch (error) {
      console.log(error);
    }
  },

  handleSendMessage: (message: any) => {
    try {
    const repMessage = socket.emit('send-message', message, ChatService.handleOnMessage)
    return repMessage;
    } catch (error) {
      console.log(error);
      
    }
  },

  handleOnMessage: () => {
    try {
      socket.on("repMessage", (arg) => {
        return arg;
      });
    } catch (error) {
      console.log(error);
      
    }
  }
  
};

export default ChatService;
