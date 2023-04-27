import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/users.entity';
import { AuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendGridService } from 'src/sendgrid/sendgrid.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendGridService: SendGridService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<User> {
    return this.usersService.user(+id);
  }

  @Get('/correo/:email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.userByEmail(email);
  }

  @Get('')
  async getAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<User[]> {
    return this.usersService.users(skip, take);
  }
  @Public()
  @Post('/add')
  async create(@Body() payload: CreateUserDto): Promise<User> {
    const user = await this.usersService.createUser(payload);
    await this.sendGridService.sendActivationEmail({
      email: user.email,
      nombre: user.name,
    });
    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(+id);
  }
}
