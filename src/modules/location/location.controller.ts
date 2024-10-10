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

  //https://maps-api.apple.com/v1/token
  //eyJraWQiOiIyMk1ZMjhNSFNKIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiI2Vkc0V0dBVlBBIiwiaWF0IjoxNzI4MDU0MzEyLCJleHAiOjE3Mjg3MTYzOTl9.8UjjzZ78WfyYFOcfz_BVzk8JxyGMrM5ydXobj9cD9L7BWAxhHUd2qhmCEsYk2fMd0cPVsn1MvqjT87nj2fQtmg
  @Post('/bulkAdd')
  async bulkAdd(@Request() req, @Response() res) {
    try {
      const added = await this.locationService.bulkAdd(req.body);
      return res.status(200).send(added)
    } catch (error) {
      return res.send(error)
    }
  }
}
