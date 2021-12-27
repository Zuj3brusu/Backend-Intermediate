import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('createPostQueue')
export class PostProcessor {

  @Process('createPostQueue')
  async handlePost(job: Job) {
    console.log("Handling createPostQueue Job")
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      'Event :',`Processing post creation job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}