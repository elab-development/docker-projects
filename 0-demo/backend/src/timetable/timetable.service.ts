import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntry } from './class-entry.entity';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(ClassEntry)
    private readonly repo: Repository<ClassEntry>,
  ) {}

  findAll(): Promise<ClassEntry[]> {
    return this.repo.find({ order: { day: 'ASC', startHour: 'ASC' } });
  }

  async findOne(id: string): Promise<ClassEntry> {
    const entry = await this.repo.findOneBy({ id });
    if (!entry) {
      throw new NotFoundException(`Class with id "${id}" not found`);
    }
    return entry;
  }

  async create(dto: CreateClassDto): Promise<ClassEntry> {
    const entry = this.repo.create({
      ...dto,
      description: dto.description ?? null,
    });
    return this.repo.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.repo.remove(entry);
  }
}
