import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
  @Field()
  id: string;

  @Field()
  roleName: string;
}
