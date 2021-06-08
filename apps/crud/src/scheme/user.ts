import { createCrudModule } from '@kesci/nest';
import { User, UserUpdateDTO } from '@kesci/model';

export const UserModule = createCrudModule({
  EntityClass: User,
  read: true,
  update: UserUpdateDTO,
});
