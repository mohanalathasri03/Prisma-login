import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}