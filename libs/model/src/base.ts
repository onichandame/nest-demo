import {
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

export abstract class Base {
  @ObjectIdColumn()
  _id!: ObjectID;
}

export abstract class Timestamp extends Base {
  @CreateDateColumn()
  CreatedAt!: Date;

  @UpdateDateColumn()
  UpdatedAt!: Date;
}

export abstract class Persistent extends Timestamp {
  @DeleteDateColumn()
  DeletedAt!: Date;
}
