import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from 'src/user/user.entity';
import { UserRoles } from 'src/userRole/userRole.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, UserRoles],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: [],
};

export const dataSource = new DataSource(dataSourceOptions);
