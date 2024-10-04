import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@modules/category/category.service';
import CategoryEntity from '@modules/database/entities/category.entity';
import { CategoryController } from '@modules/category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
