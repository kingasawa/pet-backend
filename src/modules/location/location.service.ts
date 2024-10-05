import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryEntity from '@modules/database/entities/category.entity';
import { ERROR_MESSAGES } from '@shared/common/constants';
import LocationEntity from '@modules/database/entities/location.entity';
import { CreateLocationDto } from '@modules/location/dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity) private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  async fetchLocation(title: string): Promise<LocationEntity> {
    return this.locationRepository.findOne({
      where: {
        title,
      }
    });
  }

  public async add(payload: CreateLocationDto): Promise<any> {
    const checkExisting = await this.fetchLocation(payload.title);
    if (checkExisting) {
      return {
        error: true,
        location: {},
        message: 'Địa điểm này đã được đăng ký',
      };
    }

    const categoryEntity: CategoryEntity = await this.categoryRepository.findOne({ where: { id: payload.category } });

    if (!categoryEntity) {
      throw new BadRequestException({ message: ERROR_MESSAGES.DATA_NOT_FOUND });
    }

    // const locationEntity: LocationEntity = this.locationRepository.create(payload);
    const locationEntity: LocationEntity = <LocationEntity>{
      ...payload,
      category: categoryEntity,
    }

    await this.locationRepository.save(locationEntity)
    return {
      error: false,
      location: locationEntity,
      message: 'Success',
    };
  }

  public async delete(id: number): Promise<LocationEntity> {
    const locationEntity: LocationEntity = await this.locationRepository.findOne({ where: { id } });
    if (!locationEntity) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    await this.locationRepository.softDelete(id);
    return locationEntity;
  }

  public async update(payload: any): Promise<LocationEntity> {
    const checkExisting: LocationEntity = await this.locationRepository.findOne({ where: { id: payload.id } });
    if (!checkExisting) {
      throw new NotFoundException({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    const locationEntity = <LocationEntity>(<unknown>{
      ...payload,
    });
    await this.locationRepository.save(locationEntity);
    return locationEntity;
  }
}
