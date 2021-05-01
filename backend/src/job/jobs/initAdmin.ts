import { User } from '../../db'
import { Role } from '../../constants'
import { BaseJob } from '../baseJob'

export class InitAdminJob extends BaseJob {
  immediate = true

  async run() {
    const admins = await this.db.find(User, { where: { roles: Role.ADMIN } })
    if (!admins.length) {
      await this.db.save(
        this.db.create<User>(User, {
          name: `admin`,
          password: `admin`,
          roles: [Role.ADMIN],
        })
      )
    }
  }
}
