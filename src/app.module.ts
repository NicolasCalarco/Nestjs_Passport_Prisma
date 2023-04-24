import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/controller/users.controller';
import { UsersService } from './users/services/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { SendGridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    SendGridModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService, AuthService],
})
export class AppModule {}
