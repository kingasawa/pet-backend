import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  category: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  longitude: string;
}

export class BulkCreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userLocation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}

export class UpdateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  category: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  longitude: string;
}
