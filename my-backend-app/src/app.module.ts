import { AppGateway } from './app.gateway';
import { Module, CacheModule, CacheStore } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from './users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    JwtModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      host: 'localhost',
      port: 6379,
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, UserService, JwtService],
})
export class AppModule {}
