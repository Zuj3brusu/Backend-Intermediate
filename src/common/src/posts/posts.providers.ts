import { Post } from '../../../services/api/src/postsAPI/post.entity';

export const postsProviders = [{
    provide: 'POSTS_REPOSITORY',
    useValue: Post,
}];