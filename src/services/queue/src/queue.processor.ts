import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('postQueue')
export class QueueProcessor {

  @Process('postQueue')
  async handlePost(job: Job) {
    console.log("Handling postQueue Job")
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}