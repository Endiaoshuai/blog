/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';

import { ILoader } from '../../common/loader/loader.interface';
import { Article } from '../article.entity';

@Injectable()
export class ArticleLoaderByUserId implements ILoader {
  public generateDataLoader(): DataLoader<number, Article[]> {
    return new DataLoader<number, Article[]>(this.findByUserId);
  }

  // eslint-disable-next-line class-methods-use-this
  private async findByUserId(ids: number[]) {
    console.log(ids);
    const articles = await getRepository(Article).find({
      where: { userId: In(ids) },
    });
    return ids.map(id => articles.filter(a => a.userId === id));
  }
}
