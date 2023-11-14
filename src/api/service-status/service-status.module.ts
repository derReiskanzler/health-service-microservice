import { Module } from '@nestjs/common';
import { ServiceStatusController } from './controller/service-status.controller';
import { ServiceStatusService } from './service/service-status.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ServiceStatusController],
  providers: [ServiceStatusService]
})
export class ServiceStatusModule {}
