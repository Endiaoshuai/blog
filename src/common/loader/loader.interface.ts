import * as DataLoader from 'dataloader';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ILoader {
  // tslint:disable-next-line: no-any
  generateDataLoader(): DataLoader<any, any>;
}
