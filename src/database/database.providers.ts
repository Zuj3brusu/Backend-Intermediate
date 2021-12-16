import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '.',
        database: 'WorkDB',
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];