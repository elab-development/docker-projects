import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { ClassType } from '../class-entry.entity';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  subject: string;

  @IsEnum(['lecture', 'lab', 'tutorial', 'seminar'])
  type: ClassType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  instructor: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  room: string;

  /** 0 = Monday … 4 = Friday */
  @IsInt()
  @Min(0)
  @Max(4)
  day: number;

  /** Start hour 8–18 */
  @IsNumber()
  @Min(8)
  @Max(18)
  startHour: number;

  /** Duration in hours; e.g. 0.5, 1, 1.5, 2 */
  @IsNumber()
  @Min(0.5)
  @Max(6)
  duration: number;

  @IsOptional()
  @IsString()
  description?: string;
}
