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

  public async register(input) {
    const data = JSON.parse(JSON.stringify(input));
    const result = await this.userRepository.save(data);
    // console.log('1111', result);
    return result;
  }

  public async findUser(id: number): Promise<User> {
    const result = await this.userRepository.findOne(id, {
      // relations: ['articles'],
    });
    // console.log(result);
    return result;
  }

  public async findAll(): Promise<User[]> {
    const result = await this.userRepository.find();
    console.log(result);
    return result;
  }
}
