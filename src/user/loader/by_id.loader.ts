/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { getRepository, In } from 'typeorm';

import { ILoader } from '../../graphql/loader/loader.interface';
import { User } from '../user.entity';

@Injectable()
export class UserLoaderById implements ILoader {
  public generateDataLoader(): DataLoader<number, User> {
    return new DataLoader<number, User>(this.findById);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private async findById(ids: number[]) {
    const users = await getRepository(User).find({ where: { id: In(ids) } });
    return ids.map(id => users.find(u => u.id === id));
  }
}
