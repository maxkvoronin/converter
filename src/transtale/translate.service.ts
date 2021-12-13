import { Injectable, NotFoundException } from '@nestjs/common';
import { NewTranslateInput } from './dto/new-translate.input';
import { Translate } from './entities/translate.mongo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { UpdateTranslateInput } from './dto/update-transtale.input';
import { FindTranslateInput } from './dto/find-translate.input';
import { LoggerService } from '../logger/logger.service';
import { Log } from '../common/utils/logErorDecorator.utils';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { TranslateMysqlEntity } from './entities/translate.mysql.entity';

@Injectable()
export class TranslateService {
  constructor(
    @InjectRepository(Translate, 'mongo')
    private readonly mongoRepository: MongoRepository<Translate>,
    @InjectRepository(TranslateMysqlEntity, 'mysql')
    private readonly mysqlRepository: Repository<TranslateMysqlEntity>,
    private readonly ctx: AsyncContext,
    private readonly logger: LoggerService,
  ) {}

  @Log()
  async create(record: NewTranslateInput): Promise<Translate> {
    const newMongoTranslate = new Translate();
    const newMysqlTranslate = new TranslateMysqlEntity();

    Object.assign(newMongoTranslate, record);
    const result = await this.mongoRepository.save(newMongoTranslate);

    Object.assign(newMysqlTranslate, record);
    this.mysqlRepository.save(newMysqlTranslate);

    return result;
  }

  @Log()
  async findOne(key: string): Promise<Translate> {
    return await this.mongoRepository.findOne({ key });
  }

  @Log()
  async find(record: FindTranslateInput): Promise<Translate[]> {
    await this.mongoRepository.find({ where: { ...record } });
    //this.logger.log('hello', this.ctx.get('requestId'), rec);
    return await this.mongoRepository.find({ where: { ...record } });
  }

  @Log()
  async deleteByKey(key: string): Promise<boolean> {
    const deleteResult = await this.mongoRepository.deleteOne({ key });

    if (deleteResult?.result?.n === 0) {
      throw new NotFoundException(key);
    }

    //await this.mysqlRepository.delete({ key });
    const mysqlResult = await this.mysqlRepository
      .createQueryBuilder()
      .delete()
      .from(TranslateMysqlEntity)
      .where('key = :key', { key })
      .execute();

    return true;
  }

  @Log()
  async update(record: UpdateTranslateInput): Promise<Translate> {
    const mongoTranslate = await this.mongoRepository.findOne({
      key: record.key,
    });

    const mysqlTranslate = await this.mysqlRepository.findOne({
      key: record.key,
    });

    Object.assign(mongoTranslate, record);
    Object.assign(mysqlTranslate, record);

    const result = await this.mongoRepository.save(mongoTranslate);
    this.mysqlRepository.save(mysqlTranslate);

    return result;
  }

  @Log()
  async sync(): Promise<boolean> {
    /*
    const mysql = await this.translateModel.findAll({ raw: true });

    const prepareMongo = mysql.map((row) => {
      return {
        key: row.key,
        rus: row.rus,
        eng: row.eng,
      };
    });

    await this.mongoRepository.deleteMany({});
    await this.mongoRepository.insertMany(prepareMongo);
*/
    return true;
  }
}
