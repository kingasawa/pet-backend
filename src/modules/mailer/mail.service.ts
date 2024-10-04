import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private _sendMail(payload: any): any {
    const { subject, email, template, context } = payload;
    try {
      this.mailerService
        .sendMail({
          sender: { address: 'no-reply@simplecode.online', name: 'Bot Talk Application' },
          to: email,
          subject,
          template,
          context,
        })
        .then(
          function (data) {
            return data;
          },
          function (error) {
            console.error(error);
            return error;
          },
        );
    } catch (e) {
      console.log('err', e);
    }
  }

  public sendNewPassword(
    name: string,
    mailTo: string,
    password
  ): any {
    this._sendMail({
      subject: `${name}, Mật khẩu của bạn đã được cấp mới`,
      email: mailTo,
      template: './reset_password',
      context: {
        name,
        password,
      },
    });
  }

  public testSendMail(): any {
    this._sendMail({
      subject: 'ICD-Vietnam Invitation Code',
      email: ['trancatkhanh@gmail.com', 'kingasawa@yahoo.com'],
      template: './invitation',
      context: {
        name: 'Khánh Trần',
        code: '3213213',
        questions: '30 questions',
        level: 'Fresher',
        duration: `30 minutes`,
        time: '24/12/2022',
      },
    });
  }
}
