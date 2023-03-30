import { ApiProperty } from '@nestjs/swagger';
export class User {
  id: number;

  email: string;
  password: string;
  @ApiProperty({ example: User, description: 'Es un usuario sin previligios' })
  role: string;
}
