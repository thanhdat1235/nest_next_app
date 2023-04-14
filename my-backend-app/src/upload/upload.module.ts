import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './../prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, JwtStrategy, UserService],
})
export class UploadModule {}
