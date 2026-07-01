import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCourceDto } from './dto/create-cource.dto';
import { UpdateCourceDto } from './dto/update-cource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cource } from 'src/db/entities/cource.entity';
import { In, Repository } from 'typeorm';
import { Class } from 'src/db/entities/class.entity';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { CourcePageOptionsDto } from './dto/cource-page-option.dto';

@Injectable()
export class CourceService {
  constructor(
    @InjectRepository(Cource)
    private courceRepository: Repository<Cource>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createCourceDto: CreateCourceDto) {
    const existing = await this.courceRepository.findOne({ where: { name: createCourceDto.name } });
    if (existing) {
      throw new HttpException('Cource already exists', HttpStatus.CONFLICT);
    }

    let classes: Class[] = [];
    if (createCourceDto.classIds?.length) {
      classes = await this.classRepository.findBy({ id: In(createCourceDto.classIds) });
    }

    const cource = this.courceRepository.create({
      name: createCourceDto.name,
      classes,
    });

    return this.courceRepository.save(cource);
  }

  async findAll() {
    return this.courceRepository.find({ relations: ['classes'] });
  }

  async findOne(id: string) {
    const cource_id = await this.courceRepository.findOne({ where: { id }, relations: ['classes'] });
    if (!cource_id) {
      throw new HttpException('Cource not found', HttpStatus.NOT_FOUND);
    }
    return cource_id;
  }

  async update(id: string, updateCourceDto: UpdateCourceDto) {
    const cource = await this.courceRepository.findOne({ where: { id }, relations: ['classes'] });
    if (!cource) {
      throw new HttpException('Cource not found', HttpStatus.NOT_FOUND);
    }

    if (updateCourceDto.name !== undefined) {
      cource.name = updateCourceDto.name;
    }

    if (updateCourceDto.classIds !== undefined) {
      cource.classes = updateCourceDto.classIds.length
        ? await this.classRepository.findBy({ id: In(updateCourceDto.classIds) })
        : [];
    }

    return this.courceRepository.save(cource);
  }

  async remove(id: string) {
    const existing = await this.courceRepository.findOne({ where: { id } });
    if (!existing) {
      throw new HttpException('Cource not found', HttpStatus.NOT_FOUND);
    }
    await this.courceRepository.delete(id);
    return { message: 'Cource deleted successfully' };
  }

  async getAllPageData(courcePageOptionsDto: CourcePageOptionsDto) {
    const queryBuilder = this.courceRepository
    .createQueryBuilder('cource')
    .leftJoinAndSelect('cource.class', 'class')
    .leftJoinAndSelect('cource.cource', 'cource');

  // Handle ordering - FIXED
  queryBuilder.select([
    'cource.id',
    'cource.name',
    'cource.isActive',
    'class.id',
    'class.name',
  ]); // added selection
 
  if (courcePageOptionsDto.search) {
    const search = courcePageOptionsDto.search.trim();
    queryBuilder.andWhere(
      '(cource.name LIKE :search)',
      { search: `%${search}%` },
    );
  }
  // taking next page data
  if (courcePageOptionsDto.page > 1) {
    courcePageOptionsDto.skip =
      (courcePageOptionsDto.page - 1) * courcePageOptionsDto.take;
  }
  queryBuilder
    .skip(courcePageOptionsDto.skip)
    .take(courcePageOptionsDto.take);
  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();
  const pageMetaDto = new PageMetaDto({
    itemCount,
    pageOptionsDto: courcePageOptionsDto,
  });
  return new PageDto<Cource>(entities, pageMetaDto);
}
}
