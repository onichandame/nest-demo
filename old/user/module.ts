import { createModelModule } from '../helpers';

import { User } from './entity';
import { UserUpdateDTO } from './updateDto';

export const UserModelModule = createModelModule({
  EntityClass: User,
  read: true,
  update: UserUpdateDTO,
});
