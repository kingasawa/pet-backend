import {
  Controller,
  Response,
  Post,
  Request,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtService } from '@nestjs/jwt';

@Controller('location')
export class LocationController {
  constructor(
    private locationService: LocationService,
  ) {}

  @Post('/add')
  async add(@Request() req, @Response() res) {
    try {
      const added = await this.locationService.add(req.body);
      return res.status(200).send(added)
    } catch (error) {
      return res.send(error)
    }
  }
}
