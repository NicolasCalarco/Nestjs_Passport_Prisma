import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User } from '../entities/users.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async userByEmail(email: string): Promise<User> {
    if (!email) {
      throw new NotFoundException(`User #${email} not found`);
    }
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async user(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async users(skip: number, take: number): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: skip ? parseInt(skip.toString(), 10) : 0,
      take: take ? parseInt(take.toString(), 10) : 10,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
