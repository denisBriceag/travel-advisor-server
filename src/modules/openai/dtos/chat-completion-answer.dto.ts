import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Accommodation,
  Climate,
  DietaryPreferences,
  Interests,
  LanguagePreferences,
  MobilityRequirements,
  TravelCompanions,
  TravelDuration,
  TravelExperience,
} from '../models/request.model';

export class ChatCompletionAnswerInputDto {
  @ApiProperty()
  @IsNumber()
  budgetFrom: number;

  @ApiProperty()
  @IsNumber()
  budgetTo: number;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsEnum(Climate)
  climate: Climate;

  @ApiProperty()
  @IsEnum(Interests)
  interests: Interests;

  @ApiProperty()
  @IsEnum(TravelDuration)
  travelDuration: TravelDuration;

  @ApiProperty()
  @IsEnum(Accommodation)
  accommodation: Accommodation;

  @ApiProperty()
  @IsEnum(TravelCompanions)
  travelCompanions: TravelCompanions;

  @ApiProperty()
  @IsEnum(LanguagePreferences)
  languagePreferences: LanguagePreferences;

  @ApiProperty()
  @IsEnum(DietaryPreferences)
  dietaryPreferences: DietaryPreferences;

  @ApiProperty()
  @IsEnum(MobilityRequirements)
  mobilityRequirements: MobilityRequirements;

  @ApiProperty()
  @IsEnum(TravelExperience)
  travelExperience: TravelExperience;

  @ApiProperty()
  @IsString()
  notes: string;
}

export class DalleImageInput {
  @ApiProperty()
  @IsString()
  countryName: string;
}
