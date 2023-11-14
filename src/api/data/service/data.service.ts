import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { ServiceName } from '../../../models/service-name.model';
import { USER_SERVICE_URL, STORAGE_SERVICE_URL, FRONTEND_SERVICE_URL } from '../../../config/env-vars.config';
import { DataResponse } from '../../../models/data-response.model';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

/**
 * Fetches health data from other services
 */
@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  constructor(private httpService: HttpService) { }

  /**
   * Request data from all services that publish health data:
   * UserService, StorageService, FrontendService
   * @returns {Promise<DataResponse>} Promise wrapping all responses
   * @memberof DataService
   */
  async makeDataRequests(): Promise<DataResponse> {
    return {
      requestCount: await this.makeDataRequest(ServiceName.FRONTEND, FRONTEND_SERVICE_URL + 'health/meta'),
      registeredUsersCount: await this.makeDataRequest(ServiceName.USER, USER_SERVICE_URL + 'health/users'),
      ...await this.makeDataRequest(ServiceName.STORAGE, STORAGE_SERVICE_URL + 'health/data')
    };
  }

  /**
   * Requests data based on serviceName and returns related response of service
   * @returns {Promise<any>} Promise wrapping service related response
   * @memberof DataService
   */
  async makeDataRequest(serviceName: ServiceName, url: string): Promise<any> {
    const config: AxiosRequestConfig = (serviceName === ServiceName.STORAGE) ? { timeout: 10000 } : {};
    const res = await lastValueFrom(this.httpService.get(url, config)
    .pipe(
        map((response: AxiosResponse) => response.data),
        catchError(err => {
            const errMsg = serviceName + ' ' + err.message;
            this.logger.error(errMsg);
            return errMsg;
        })
    ));

    switch(serviceName) {
      case ServiceName.FRONTEND:
        return res.numberOfRequests;
      case ServiceName.STORAGE:
        return {
          memeCount: res.memeCount,
          popularTags: res.popularTags,
        };
      // For UserService registeredUsers
      default:
        return res;
    }
  }

}