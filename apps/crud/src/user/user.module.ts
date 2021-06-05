import { createCrudModule } from '@kesci/nest';
import { Module } from '@nestjs/common';
import { User } from '@kesci/model';

import { UserDTO, UserUpdateDTO } from './dto';

@Module({
  imports: [
    createCrudModule({
      DTOClass: UserDTO,
      EntityClass: User,
      read: true,
      update: UserUpdateDTO,
    }),
  ],
})
export class UserModule {}
