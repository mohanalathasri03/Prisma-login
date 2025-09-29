import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, role: Role) {
    return this.prisma.user.create({ data: { email, password, role } });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOrCreateUser(email: string, googleId: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: { email, googleId, role: 'USER' },
      });
    }
    return user;
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }
}