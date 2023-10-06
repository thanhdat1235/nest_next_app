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
      socket.emit('send-message', message, ChatService.handleOnMessage);
    } catch (error) {
      console.log(error);

    }
  },

  handleOnMessage: () => {
    return new Promise((resolve, reject) => {
      socket.on("repMessage", (message: string) => {
        resolve(message);
      });
    });
  }




};

export default ChatService;
