import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch){
            const { password, ...result } = user;
            return result;
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.dataValues.email, sub: user.dataValues.firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}