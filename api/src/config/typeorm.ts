import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig();

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  ssl: process.env.ENVIRONMENT === 'production' ? true : false,
  extra:
    process.env.ENVIRONMENT === 'production'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : null,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
