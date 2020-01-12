import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class ArticleInput {
  @Field()
  public title: string;

  @Field()
  public content: string;

}
