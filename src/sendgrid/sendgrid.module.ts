import { SendGridService } from './sendgrid.service';
import { Module } from '@nestjs/common';
import { EmailController } from './sendgrid.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SendGridService, JwtService],
  exports: [SendGridService],
  controllers: [EmailController],
})
export class SendGridModule {}
