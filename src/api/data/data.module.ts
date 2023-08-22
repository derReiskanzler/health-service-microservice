import { HttpModule, Module } from '@nestjs/common';
import { DataController } from './controller/data.controller';
import { DataService } from './service/data.service';

@Module({
  controllers: [DataController],
  imports: [HttpModule],
  providers: [DataService]
})
export class DataModule {}
