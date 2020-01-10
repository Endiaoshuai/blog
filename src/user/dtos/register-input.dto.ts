import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public name: string;
}
