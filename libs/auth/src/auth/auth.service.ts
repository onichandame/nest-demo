import { Injectable } from '@nestjs/common';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { verify, sign } from 'jsonwebtoken';
import * as yup from 'yup';
import { Request } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { User, Model } from '@kesci/model';

import { publicKey, privateKey, algorithm } from '../secrets';
import { userHeader } from './auth.constants';

const PayloadSchema = yup
  .object({ id: yup.string().required(), name: yup.string().required() })
  .required();

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private users: Model<User>) {}

  private isRequestValid(req: Request): req is Request {
    return req && req.header && typeof req.header === `function`;
  }

  private validateReqeust(req: Request) {
    if (!this.isRequestValid(req))
      throw new Error(`currently only supports apollo-server-express!`);
  }

  private async getUser(id: string) {
    return this.users
      .findById(id)
      .orFail(new Error(`用户${id}找不到`))
      .exec();
  }

  async encode(payload: yup.Asserts<typeof PayloadSchema>) {
    await PayloadSchema.validate(payload);
    return sign(payload, privateKey, { algorithm });
  }

  async decode(token: string) {
    return PayloadSchema.validate(
      verify(token, publicKey, { algorithms: [algorithm] })
    );
  }

  async parseUserAtGateway(req: Request) {
    this.validateReqeust(req);
    const authHeader = req.header(`authorization`);
    if (authHeader) {
      const token = authHeader.split(`Bearer `)[1];
      if (token) {
        const { id } = await this.decode(token);
        const user = await this.getUser(id);
        return user;
      }
    }
    return null;
  }

  async stringifyUserAtGateway(
    ctx: Parameters<NonNullable<RemoteGraphQLDataSource['willSendRequest']>>[0]
  ) {
    if (ctx.context.user) {
      ctx.request.http?.headers.set(
        `x-kesci-user`,
        JSON.stringify(ctx.context.user)
      );
    }
  }

  async parseUserAtService(req: Request) {
    this.validateReqeust(req);
    const userStr = req.header(userHeader);
    if (userStr) return JSON.parse(userStr) as User;
    else return null;
  }
}
