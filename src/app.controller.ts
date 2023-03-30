import { Controller, Get } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
