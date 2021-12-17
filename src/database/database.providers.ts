import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.model';

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
        dialect:'postgres',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];