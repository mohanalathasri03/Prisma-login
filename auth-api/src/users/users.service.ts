import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(email: string, password: string, role: Role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersRepository.createUser(email, hashedPassword, role);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findUserByEmail(email);
    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async findById(id: number) {
    return this.usersRepository.findUserById(id);
  }

  async findOrCreate(email: string, googleId: string) {
    return this.usersRepository.findOrCreateUser(email, googleId);
  }

  async findAll() {
    return this.usersRepository.findAllUsers();
  }
}