import {
  Controller,
  Response,
  Post,
  Request,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
  ) {}

  @Post('/add')
  async add(@Request() req, @Response() res) {
    try {
      const added = await this.categoryService.add(req.body);
      return res.status(200).send(added)
    } catch (error) {
      return res.send(error)
    }
  }
}
