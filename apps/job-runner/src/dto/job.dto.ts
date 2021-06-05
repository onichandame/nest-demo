import { Field, ObjectType, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive(`@key(fields: "name")`)
export class JobDTO {
  @Field()
  name: string;
  @Field()
  runnable: boolean;
}
