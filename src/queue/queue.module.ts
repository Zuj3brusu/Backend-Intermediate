import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QueueProcessor } from './queue.processor';
import { QueueResolver } from './queue.resolver';
import { QueueService } from './queue.service';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'postQueue',
    })
  ],
  providers: [
    QueueService,
    QueueResolver,
    QueueProcessor,
  ]
})
export class QueueModule {}
