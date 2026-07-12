import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
    type: 'sqlite',
    database: '.db/sql',
    synchronize: true, // Obs: usar "synchronize: true" somente em desenvolvimento
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
};