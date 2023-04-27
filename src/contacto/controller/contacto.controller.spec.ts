import { Test, TestingModule } from '@nestjs/testing';
import { ContactoController } from './contacto.controller';

describe('ContactoController', () => {
  let controller: ContactoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactoController],
    }).compile();

    controller = module.get<ContactoController>(ContactoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
