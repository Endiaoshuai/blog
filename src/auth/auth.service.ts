import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  public async generateToken(user: User): Promise<string> {
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }
}
