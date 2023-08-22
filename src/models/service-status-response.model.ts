import { ServiceStatusObj } from 'src/models/service-status-obj.model';

export interface ServiceStatusResponse {
    serviceStatuses: ServiceStatusObj[];
}