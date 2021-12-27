import { Inject, Injectable } from '@nestjs/common';
import { User } from '../usersAPI/user.entity';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @Inject('POSTS_REPOSITORY')
        private postsRepository: typeof Post
      ) {}

    async findAll(): Promise<Post[]> {
        return this.postsRepository.findAll<Post>();
    }

    async findAllByEmail(providedEmail: string): Promise<Post[]> {
        return this.postsRepository.findAll<Post>({where: {creatorEmail : providedEmail}});
    }

    async postCount(providedEmail: string): Promise<number> {
        return this.postsRepository.count<Post>({where: {creatorEmail : providedEmail}});
    }
      
    async create(user: User, postContent: any): Promise<Post> {
        const post = new Post();
        let dataSaved:any;
        post.postContent = postContent;
        post.creatorEmail = user.email;

        return post.save().then(data => {
            dataSaved=data
            return dataSaved.dataValues;
        })
        .catch(error => {
            console.log(error)
        });;
            
    }
}
