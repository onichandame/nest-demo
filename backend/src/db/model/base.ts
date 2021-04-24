import { ObjectID, ObjectIdColumn } from 'typeorm'

export class Base {
  @ObjectIdColumn({ nullable: false })
  id: ObjectID
}
