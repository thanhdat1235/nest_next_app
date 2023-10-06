import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) { }
  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    const { email, password } = createUserDto;

    const isExitsUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isExitsUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashPassword;

    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
      });

      newUser.password = undefined;

      return newUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const allUser = await this.prisma.user.findMany({
        include: {
          avatar: true,
        },
      });
      const response = allUser.map((user) => {
        user.password = undefined;
        return user;
      });
      return response;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          avatar: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('User is not exist', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: string,
    updateUserDTO: Prisma.UserCreateInput,
  ): Promise<User> {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!hasUser) {
      throw new HttpException('User is not exists', HttpStatus.BAD_REQUEST);
    }
    try {
      const userUpdate = await this.prisma.user.update({
        where: { id: id },
        data: updateUserDTO,
      });
      userUpdate.password = undefined;
      const avatarUpdate = await this.uploadService.findUniqueAvatarUser(id);
      userUpdate['avatar'] = avatarUpdate;

      return userUpdate;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOne(id: string, dataUpdate: string): Promise<User> {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!hasUser) {
      throw new HttpException('User is not exists', HttpStatus.BAD_REQUEST);
    }
    try {
      const userUpdate = await this.prisma.user.update({
        where: { id },
        data: {
          refresh_token: dataUpdate,
        },
      });
      userUpdate.password = undefined;
      return userUpdate;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    const hasUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!hasUser) {
      throw new HttpException('User is not exists', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      throw new HttpException('Delete user successfuly', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
