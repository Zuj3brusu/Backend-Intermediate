import { InjectQueue } from '@nestjs/bull';
import {Resolver, Query, ResolveField, Args, Parent, Mutation} from '@nestjs/graphql'
import Bull, { Queue } from 'bull';

@Resolver()
  export class QueueResolver {
  constructor(
    @InjectQueue('postQueue') private readonly postQueue: Queue,
  ) {}

  @Mutation('postQueue')
  async createJob(obj, args, context, info): Promise<any> {
    const { content } = args;
    console.log(content)
    const job = await this.postQueue.add('postQueue', {
      queueContent:content,
    });
 
    return {
      jobId: job.id
    }
  }

  @Query()
  async getQueue(obj, args, context, info) {
    const { id } = args;
    const getQueuePost = await this.postQueue.getJob(id);
    return 'getQueue Works!';
  }
}