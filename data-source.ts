import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'social-app',
  password: process.env.DB_PASSWORD || 'social-app',
  database: process.env.DB_NAME || 'social-app',
  synchronize: false,
  logging: true,
  entities: ['libs/entity/src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
});
