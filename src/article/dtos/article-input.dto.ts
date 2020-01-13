import { Field, InputType } from 'type-graphql';

@InputType()
export class ArticleInput {
  @Field()
  public title: string;

  @Field()
  public content: string;
}
