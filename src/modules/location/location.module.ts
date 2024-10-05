import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from '@modules/location/location.service';
import LocationEntity from '@modules/database/entities/location.entity';
import CategoryEntity from '@modules/database/entities/category.entity';
import { LocationController } from '@modules/location/location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, CategoryEntity])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [TypeOrmModule, LocationService],
})
export class LocationModule {}
