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
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';

export interface IInformation {
  id: number | string;
  user_id: number | string | null;
  status: boolean;
  type: TypeInformation | null;
  value: string;
}

export enum TypeInformation {
  'socket_id' = 'socket_id',
  'device_id' = 'device_id',
}

@WebSocketGateway(4002, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:4002'],
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit,
  // OnGatewayConnection
  OnGatewayDisconnect {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('sendMessage')
  async getDataUserFromCookie(client: Socket): Promise<Prisma.UserCreateInput> {
    // const authToken: any = client.handshake.headers?.cookie.replace(
    //   'access=', 
    //   '',
    // );

    const authToken: any = parse(client.handshake.headers?.cookie).access;

    console.log(authToken);

    const decoded = this.jwtService.verify(authToken, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });

    try {
      const user = await this.userService.findOne(decoded.email); // response to function
      return user;
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload): Promise<void> {
    console.log(payload);


    //  await this.appService.createMessage(payload);
    this.server.emit('repMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  // async handleConnection(client: Socket, ...args: any[]) {    
  //   // console.log(`Connected ${client.id}`);

  //   const user: Prisma.UserCreateInput = await this.getDataUserFromCookie(
  //     client, 
  //   );

  //   const information = {
  //     user_id: user.id, 
  //     type: TypeInformation.socket_id,
  //     status: false,
  //     value: client.id,
  //   };
  // }



}
