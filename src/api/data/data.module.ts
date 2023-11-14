import { Module } from '@nestjs/common';
import { DataController } from './controller/data.controller';
import { DataService } from './service/data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DataController],
  imports: [HttpModule],
  providers: [DataService]
})
export class DataModule {}
