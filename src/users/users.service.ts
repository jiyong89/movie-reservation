// users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = this.userRepository.create({ username, password });
    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { username, password } });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }

  async findProfile(id: string) {
    const userId = parseInt(id, 10);
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // 사용자 비밀번호를 제외하고 프로필을 반환합니다.
    const { password, ...profile } = user;
    return profile;
  }
}
