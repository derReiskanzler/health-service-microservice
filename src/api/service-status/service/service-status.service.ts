import { HttpService, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { FRONTEND_SERVICE_URL, STORAGE_SERVICE_URL, USER_SERVICE_URL, INDEX_SERVICE_URL } from '../../../config/env-vars.config';
import { ServiceName } from '../../../models/service-name.model';
import { Status, ServiceStatusObj } from '../../../models/service-status-obj.model';

const SUFFIX = 'health';
@Injectable()
export class ServiceStatusService {
    private readonly logger = new Logger(ServiceStatusService.name);

    constructor(private httpService: HttpService) {}

    /**
     * Requests Frontend, User, Index & Storage services /health endpoint
     * @returns {Promise<ServiceStatusObj[]>} Promise wrapping an array of Service
     * Status Objects
     * @memberof ServiceStatusService
     */
    async makeServiceRequests(): Promise<ServiceStatusObj[]> {
        const responsesArray = [];
        responsesArray.push(await this.makeServiceRequest(ServiceName.FRONTEND, FRONTEND_SERVICE_URL + SUFFIX));
        responsesArray.push(await this.makeServiceRequest(ServiceName.USER, USER_SERVICE_URL + SUFFIX));
        responsesArray.push(await this.makeServiceRequest(ServiceName.INDEX, INDEX_SERVICE_URL + SUFFIX));
        responsesArray.push(await this.makeServiceRequest(ServiceName.STORAGE, STORAGE_SERVICE_URL + SUFFIX));
        return responsesArray;
    }

    async makeServiceRequest(serviceName: ServiceName, url: string): Promise<ServiceStatusObj> {
        const res = await this.httpService.get(url)
            .pipe(
                map((response: AxiosResponse) => response.status),
                catchError(err => {
                    this.logger.error(err.message);
                    return err.message;
                })
            ).toPromise();
        const status = res === 200 ? Status.ONLINE : Status.OFFLINE;
        return {
            serviceName,
            status
        } as ServiceStatusObj;
    }
}
