import { Injectable, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../auth/guards/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role as Role,
    );
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req, @Res() res) {
    if (!req.user) {
      console.error('No user from google');
      return res.redirect('http://localhost:3002/login');
    }

    console.log('User from google:', req.user);

    try {
      const user = await this.usersService.findOrCreate(
        req.user.email,
        req.user.accessToken,
      );
      console.log('User from db:', user);

      const payload = { email: user.email, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);
      console.log('JWT token:', token);

      return res.redirect(`http://localhost:3002/google/callback?token=${token}`);
    } catch (error) {
      console.error('Error in googleLogin:', error);
      return res.redirect('http://localhost:3002/login');
    }
  }
}