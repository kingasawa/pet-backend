import {
  Controller,
  Response,
  Post,
  Request, Delete, UseGuards, Param, Put, Body, UseInterceptors, UploadedFile, BadRequestException, Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@modules/auth/auth.guard';
import { UserService } from './user.service';
import UserEntity from '@modules/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log('req', req);
          console.log('file', file);
          file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    console.log('Uploaded file:', file);
    return {
      message: 'File uploaded successfully',
      filename: file.filename,
    };
  }

  @Post('/register')
  async login(@Request() req, @Response() res) {
    try {
      const registered = await this.userService.register(req.body);
      if (!registered.error) {
        registered.user.accessToken = this.jwtService.sign({ email: registered.user.email })
      }
      return res.status(200).send(registered)
    } catch (error) {
      return res.send(error)
    }
  }

  @Post('/reset-password')
  async resetPassword(@Request() req, @Response() res) {
    try {
      console.log('req.body', req.body);
      const reset = await this.userService.resetPassword(req.body);
      return res.status(200).send(reset)
    } catch (error) {
      return res.send(error)
    }
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number, @Response() res): Promise<UserEntity> {
    const deleted: UserEntity = await this.userService.deleteUser(id);
    return res.json({ deleted });
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async editUser(@Body() updateUserDto: any, @Response() res): Promise<any> {
    const updated = await this.userService.updateUserDetail(updateUserDto);
    return res.json({ updated });
  }

  @UseGuards(AuthGuard)
  @Get('/doTest')
  async doTest(@Body() updateUserDto: any, @Response() res): Promise<any> {
    const updated = await this.userService.updateUserDetail(updateUserDto);
    return res.json({ updated });
  }

  // @UseGuards(AuthGuard)
  @Post('/talk')
  async talkToBot(@Request() req, @Response() res): Promise<any> {
    const message = await this.userService.talkToBot(req.body);
    return res.json({ message });
  }
}
