import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassEntry } from './class-entry.entity';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  /** GET /timetable — list all classes */
  @Get()
  findAll(): Promise<ClassEntry[]> {
    return this.timetableService.findAll();
  }

  /** GET /timetable/:id — get a single class */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ClassEntry> {
    return this.timetableService.findOne(id);
  }

  /** POST /timetable — add a new class */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateClassDto): Promise<ClassEntry> {
    return this.timetableService.create(dto);
  }

  /** DELETE /timetable/:id — remove a class */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.timetableService.remove(id);
  }
}
