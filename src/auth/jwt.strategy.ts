import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../user/user.entity';
import { JWTPayload } from './dtos/jwt-payload.dto';

const { JWT_SECRET } = process.env;

console.log('1111', JWT_SECRET);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  public async validate(payload: JWTPayload): Promise<User> {
    // console.log('JwtSta', payload);
    return User.findOne({ where: { id: payload.sub } });
  }
}
