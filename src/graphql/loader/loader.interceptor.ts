import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

// import { BookLoaderById } from '../../core/book/loader/by_id.loader';
import { ArticleLoaderByUserId } from '../../article/loader/by_user_id.loader';
import { UserLoaderById } from '../../user/loader/by_id.loader';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const generateDataLoaders = () => {
  return {
    UserLoaderById: new UserLoaderById().generateDataLoader(),
    // BookLoaderById: new BookLoaderById().generateDataLoader(),
    BookLoaderByUserId: new ArticleLoaderByUserId().generateDataLoader(),
  };
};

@Injectable()
export class LoaderInterceptor implements NestInterceptor {
  // eslint-disable-next-line class-methods-use-this
  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const gqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = gqlExecutionContext.getContext();

    const loaders = generateDataLoaders();

    Object.keys(loaders).forEach(key => {
      ctx[key] = loaders[key];
    });

    return next.handle();
  }
}
