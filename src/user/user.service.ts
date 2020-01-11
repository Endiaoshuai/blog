import { Injectable } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async register(input): Promise<User> {
    const data = JSON.parse(JSON.stringify(input));
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.name = data.name;
    const result = user.save();
    return result;
  }

  public async findUser(id: number): Promise<User> {
    const result = await this.userRepository.findOne(id, {
      // relations: ['articles'],
    });
    console.log(result);
    return result;
  }

  public async findAll(): Promise<User[]> {
    const result = await this.userRepository.find();
    // console.log(result);
    return result;
  }
}
