import { Entity, Column } from 'typeorm';
import { ObjectType, Directive, Field } from '@nestjs/graphql';
import { Timestamp } from '@kesci/datatype';

@ObjectType()
@Directive(`@key(fields: "id")`)
@Entity()
export class User extends Timestamp {
  @Field()
  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;
}
