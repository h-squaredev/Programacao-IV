import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
};