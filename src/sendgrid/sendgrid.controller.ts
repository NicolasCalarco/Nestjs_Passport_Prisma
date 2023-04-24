import { Controller, Post, Body } from '@nestjs/common';
import { SendGridService } from './sendgrid.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('send/email')
export class EmailController {
  constructor(private readonly sendGridService: SendGridService) {}

  @Post()
  @Public()
  @UseGuards(AuthGuard)
  async sendEmail(@Body() body) {
    const { to, subject, text, html } = body;
    await this.sendGridService.sendEmail(to, subject, text, html);
    return { status: 'Email enviado' };
  }
}
