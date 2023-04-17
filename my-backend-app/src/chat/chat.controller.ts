import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  createGroup(@Body() group: Prisma.GroupCreateManyInput) {
    return this.chatService.createGroup(group);
  }
}
