import { User } from '@kesci/model';
import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, ctx) => {
  return GqlExecutionContext.create(ctx).getContext().req.user as User;
});
