/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';

import { ILoader } from '../../common/loader/loader.interface';
import { Article } from '../article.entity';

@Injectable()
export class ArticleLoaderById implements ILoader {
  public generateDataLoader(): DataLoader<number, Article> {
    return new DataLoader<number, Article>(this.findById);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // eslint-disable-next-line class-methods-use-this
  private async findById(ids: number[]) {
    const articles = await getRepository(Article).find({
      where: { id: In(ids) },
    });
    return ids.map(id => articles.find(a => a.id === id));
  }
}
