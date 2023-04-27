import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Contacto } from '../entities/contacto.entity';
import { CreateContactoDto } from '../dtos/contacto.dto';

@Injectable()
export class ContactoService {
  constructor(private prisma: PrismaService) {}

  async createContacto(data: CreateContactoDto): Promise<Contacto> {
    return await this.prisma.contacto.create({
      data,
    });
  }

  async contactos(skip: number, take: number): Promise<Contacto[]> {
    return this.prisma.contacto.findMany({
      skip: skip ? parseInt(skip.toString(), 10) : 0,
      take: take ? parseInt(take.toString(), 10) : 10,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async contacto(id: number): Promise<Contacto> {
    const contacto = await this.prisma.contacto.findUnique({
      where: { id },
    });
    if (!contacto) {
      throw new NotFoundException(`Contacto #${id} not found`);
    }
    return contacto;
  }

  async deleteContacto(id: number): Promise<Contacto> {
    return this.prisma.contacto.delete({
      where: { id },
    });
  }

  async updateContacto(id: number, data: CreateContactoDto): Promise<Contacto> {
    return this.prisma.contacto.update({
      where: { id },
      data,
    });
  }
}
