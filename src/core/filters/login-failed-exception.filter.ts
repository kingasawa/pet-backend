import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginFailedException } from '@core/exceptions/loginFailed.exception';

@Catch(LoginFailedException)
export class LoginFailedExceptionFilter implements ExceptionFilter {
  constructor() {}
  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>()
    res.status(400).send({
      success: false,
      message: 'validationMsg.login_fail',
    });
  }
}
