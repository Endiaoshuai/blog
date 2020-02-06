import * as DataLoader from 'dataloader';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ILoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateDataLoader(): DataLoader<any, any>;
}
