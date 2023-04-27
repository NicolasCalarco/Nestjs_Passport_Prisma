import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendGridService } from '../sendgrid/sendgrid.service';
import { EmailController } from '../sendgrid/sendgrid.controller';

@Module({
  imports: [],
  providers: [
    PrismaService,
    UsersService,
    JwtService,
    SendGridService,
    EmailController,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
