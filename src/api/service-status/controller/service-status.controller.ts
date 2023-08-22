import { Controller, Get, Logger} from '@nestjs/common';
import { ServiceStatusResponse } from 'src/models/service-status-response.model';
import { ServiceStatusService } from '../service/service-status.service';

@Controller()
export class ServiceStatusController {
    private readonly logger = new Logger(ServiceStatusController.name);

    constructor(private service: ServiceStatusService) {}

    @Get('/v1/health/services')
    async statusServices(): Promise<ServiceStatusResponse> {
        this.logger.log('Call GET /v1/health/services');

        return this.service.makeServiceRequests()
            .then(serviceStatuses => ({ serviceStatuses } as ServiceStatusResponse));
    }
}
