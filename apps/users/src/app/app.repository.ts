import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@common/entity';
import { SignUpDto } from '@common/dto';

@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: SignUpDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
