import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encrypt, decrypt } from '@shared/common/helper';
import UserEntity from '@modules/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(payload: any): Promise<any> {
    const { username, password } = payload;
    console.log('validateUser payload', payload);
    const userEntity: UserEntity = await this.userService.fetchUser(username);
    if (!userEntity) {
      return null;
    }
    const passwordMatch = decrypt(userEntity.password) === password;
    if (passwordMatch) {
      console.log('Step 3: check passwordMatch', passwordMatch);
      const { password, ...result } = userEntity;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('Step 5: login', user);
    if (!user) return null;
    const payload = { email: user.email };
    const signToken = this.jwtService.sign(payload);
    return {
      login: true,
      accessToken: signToken,
      refreshToken: signToken,
    };
  }
}
