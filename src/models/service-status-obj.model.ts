import { ServiceName } from 'src/models/service-name.model';

export type Status = 'ONLINE' | 'OFFLINE';

export const Status = {
    ONLINE: 'ONLINE' as Status,
    OFFLINE: 'OFFLINE' as Status,
};

export interface ServiceStatusObj {
    serviceName: ServiceName;
    status: Status;
}