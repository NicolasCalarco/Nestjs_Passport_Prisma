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
import { ContactoService } from '../services/contacto.service';
import { CreateContactoDto } from '../dtos/contacto.dto';
import { Contacto } from '../entities/contacto.entity';
import { AuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendGridService } from 'src/sendgrid/sendgrid.service';

@Controller('contacto')
@UseGuards(AuthGuard)
export class ContactoController {
  constructor(
    private readonly contactoService: ContactoService,
    private readonly sendGridService: SendGridService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<Contacto> {
    return this.contactoService.contacto(+id);
  }

  @Get('')
  async getAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<Contacto[]> {
    return this.contactoService.contactos(skip, take);
  }

  @Public()
  @Post('/add')
  async create(@Body() payload: CreateContactoDto): Promise<Contacto> {
    const contacto = await this.contactoService.createContacto(payload);

    await this.sendGridService.sendContactoEmail({
      email: contacto.email,
      nombre: contacto.nombre,
    });

    return contacto;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: CreateContactoDto,
  ): Promise<Contacto> {
    return this.contactoService.updateContacto(+id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Contacto> {
    return this.contactoService.deleteContacto(+id);
  }
}
