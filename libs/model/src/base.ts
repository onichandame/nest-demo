import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
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
  @Column({ default: false })
  Deleted!: boolean;
}
