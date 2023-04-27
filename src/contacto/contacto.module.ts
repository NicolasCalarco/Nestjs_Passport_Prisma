import { Module } from '@nestjs/common';
import { ContactoController } from './controller/contacto.controller';
import { ContactoService } from './services/contacto.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { EmailController } from 'src/sendgrid/sendgrid.controller';

@Module({
  imports: [],
  controllers: [ContactoController],
  providers: [
    ContactoService,
    PrismaService,
    JwtService,
    SendGridService,
    EmailController,
  ],
  exports: [ContactoService],
})
export class ContactoModule {}
