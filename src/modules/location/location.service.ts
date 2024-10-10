import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryEntity from '@modules/database/entities/category.entity';
import { ERROR_MESSAGES } from '@shared/common/constants';
import LocationEntity from '@modules/database/entities/location.entity';
import { CreateLocationDto, BulkCreateLocationDto } from '@modules/location/dto/location.dto';
import { MapService } from '@modules/services/maps.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity) private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly mapService: MapService
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
    if (!checkExisting) {
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

  public async bulkAdd(payload: BulkCreateLocationDto): Promise<any> {
    const { key, userLocation, token } = payload;
    const data = await this.mapService.searchPlace(key, userLocation, token);
    await Promise.all(
      data.results.map(async(item: any) => {
        let categoryEntity: CategoryEntity = await this.categoryRepository.findOne({ where: { title: item.poiCategory } });
        console.log('categoryEntity', categoryEntity);
        if (!categoryEntity) {
          const category: CategoryEntity = <CategoryEntity>{
            title: item.poiCategory,
          }
          categoryEntity = await this.categoryRepository.save(category);
        }
        const location: LocationEntity = await this.locationRepository.findOne({ where: { locationId: item.id } });
        if (!location) {
          const locationEntity: LocationEntity = <LocationEntity>{
            category: categoryEntity,
            locationId: item.id,
            title: item.name,
            address: item.formattedAddressLines.join(', '),
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude
          }
          await this.locationRepository.save(locationEntity)
        }
      })
    )
    return data.results;
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
