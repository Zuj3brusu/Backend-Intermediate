import { User } from '../../../services/api/src/usersAPI/user.entity';

export const usersProviders = [{
    provide: 'USERS_REPOSITORY',
    useValue: User,
}];