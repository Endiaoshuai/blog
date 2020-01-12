import { Field, InputType, ID } from 'type-graphql';
import { Article } from '../article.entity';

@InputType()
export class ArticleUpdateInput {

  @Field({
      description: '文章的id'
  })
  public id: number

  @Field()
  public title: string;

  @Field()
  public content: string;

}
