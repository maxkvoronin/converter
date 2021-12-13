import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: ConnectionOptions = {
  name: 'mongo',
  type: 'mongodb',
  host: process.env.MONGODB_HOST,
  database: process.env.MONGODB_NAME,
  entities: [__dirname + '/../../**/*.mongo.entity{.ts,.js}'],
  synchronize: false,
  useUnifiedTopology: true,
};

export default config;
