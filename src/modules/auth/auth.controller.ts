import {
  Controller,
  Get,
  Response,
  Post,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginFailedExceptionFilter } from '@core/filters/login-failed-exception.filter';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
import { UserService } from '@modules/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginFailedExceptionFilter)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    try {
      console.log('Step 4: TicketController req.user', req.user);
      const loginData = await this.authService.login(req.user);
      console.log('Step 6 get Login data', loginData);
      return res.status(200).send(loginData)
    } catch (error) {
      return res.send(error)
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.fetchUser(req.user.email);
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateInfo(@Request() req) {
    console.log('req.user', req.user);
    console.log('req.body', req.body);
    return await this.userService.selfUpdate(req.body);
  }

  @UseGuards(AuthGuard)
  @Post('notification')
  async updateNotification(@Request() req) {
    const { pushToken, notification } = req.body;
    const payload = {
      pushToken, notification,
      email: req.user.email
    }
    return await this.userService.notificationUpdate(payload);
  }

  @Get('test')
  test(@Request() req, @Response() res) {
    console.log('test app');
    return res.status(200).send("test app");
  }
}
