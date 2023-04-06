import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UserService } from '../users/users.service';
import { Prisma } from '@prisma/client';

@WebSocketGateway(4002, { cors: true })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendMessage')

  async getDataUserFromToken(client: Socket): Promise<Prisma.UserCreateInput> {
    const authToken: any = client.handshake.headers?.token;
    
    const decoded = this.jwtService.verify(authToken);
    try {
      console.log(decoded);
      const user = await this.userService.findOne(decoded.email); // response to function
      console.log(user);
      
      return user;
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async handleSendMessage(client: Socket, payload): Promise<void> {
    //  await this.appService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {    
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

 async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    const user: Prisma.UserCreateInput = await this.getDataUserFromToken(client);
  
    // const device = {
    //   user_id: user.id,
    //   type: TypeInformation.socket_id,
    //   status: false,
    //   value: client.id,
    // };

    //Do stuffs
  }
}
