import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupResponse } from 'src/auth/dto/signup-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<SignupResponse> {
    const userExists = await this.userRepository.exists({
      where: {
        email: createUserInput.email,
      },
    });
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    // const newUser = this.userRepository.create(createUserInput);
    return await this.userRepository.save(createUserInput);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: username });

    if (!user) {
      throw new NotFoundException(`User ${username} not found.`);
    }
    return user;
  }
}
