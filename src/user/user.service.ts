import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error(`User with ID ${id} not found.`);
    }
    const updatedUser = { ...userToUpdate, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      throw new Error(`User with ID ${id} not found.`);
    }
    await this.userRepository.remove(userToRemove);
  }
}
