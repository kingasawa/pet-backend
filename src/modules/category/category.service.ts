import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '@shared/common/constants';
import CategoryEntity from '@modules/database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async fetchCategory(title: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({
      where: {
        title,
      }
    });
  }

  public async add(payload: CategoryEntity): Promise<any> {
    const checkExisting = await this.fetchCategory(payload.title);
    if (checkExisting) {
      return {
        error: true,
        user: {},
        message: 'Email này đã được đăng ký',
      };
    }
    const categoryEntity: CategoryEntity = this.categoryRepository.create(payload);
    await this.categoryRepository.save(categoryEntity)
    return {
      error: false,
      location: categoryEntity,
      message: 'Success',
    };
  }

  public async delete(id: number): Promise<CategoryEntity> {
    const categoryEntity: CategoryEntity = await this.categoryRepository.findOne({ where: { id } });
    if (!categoryEntity) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    await this.categoryRepository.softDelete(id);
    return categoryEntity;
  }

  public async update(payload: any): Promise<CategoryEntity> {
    const checkExisting: CategoryEntity = await this.categoryRepository.findOne({ where: { id: payload.id } });
    if (!checkExisting) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const categoryEntity = <CategoryEntity>(<unknown>{
      ...payload,
    });
    await this.categoryRepository.save(categoryEntity);
    return categoryEntity;
  }
}
