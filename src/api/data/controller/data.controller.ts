import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { DataResponse } from '../../../models/data-response.model';
import { DataService } from '../service/data.service';

@Controller()
export class DataController {
  private readonly logger = new Logger(DataController.name);

  constructor(private dataService: DataService){}

  @Get('/v1/health/data')
  async dataServices(): Promise<DataResponse> {
    this.logger.log('Call GET /v1/health/data');
    return this.dataService.makeDataRequests()
      .catch(err => {
        this.logger.error(err.message);
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}