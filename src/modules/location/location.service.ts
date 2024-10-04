import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '@modules/database/entities/user.entity';
import { encrypt } from '@shared/common/helper';
import { ERROR_MESSAGES } from '@shared/common/constants';
import LocationEntity from '@modules/database/entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}

  async findAll(): Promise<LocationEntity[]> {
    return this.locationRepository.find();
  }

  // async fetchLocation(email: string): Promise<LocationEntity> {
  //   return this.locationRepository.findOne({
  //     where: {
  //       email,
  //     }
  //   });
  // }

  public async add(payload: LocationEntity): Promise<any> {
    // const checkExisting = await this.fetchLocation(payload.email);
    // if (checkExisting) {
    //   return {
    //     error: true,
    //     user: {},
    //     message: 'Email này đã được đăng ký',
    //   };
    // }
    const locationEntity: LocationEntity = this.locationRepository.create(payload);
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
