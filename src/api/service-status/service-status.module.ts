import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http/http.module';
import { ServiceStatusController } from './controller/service-status.controller';
import { ServiceStatusService } from './service/service-status.service';

@Module({
  imports: [HttpModule],
  controllers: [ServiceStatusController],
  providers: [ServiceStatusService]
})
export class ServiceStatusModule {}
