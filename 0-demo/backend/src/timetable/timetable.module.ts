import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntry } from './class-entry.entity';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntry])],
  providers: [TimetableService],
  controllers: [TimetableController],
})
export class TimetableModule {}
