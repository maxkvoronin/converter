import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
  name: 'mysql',
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DBNAME,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  entities: [__dirname + '/../../**/*.mysql.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/common/migrations',
  },
};

export default config;
