import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Motivo } from '@prisma/client';

export class CreateContactoDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  motivo: Motivo;

  @IsString()
  @IsOptional()
  mensaje: string;
}
