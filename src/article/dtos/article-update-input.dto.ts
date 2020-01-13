import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class ArticleUpdateInput {
  @Field({
    description: '文章的id',
  })
  public id: number;

  @Field()
  public title: string;

  @Field()
  public content: string;
}
