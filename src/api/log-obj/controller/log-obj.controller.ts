import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Query } from '@nestjs/common';
import { LogObjValidationPipe } from '../../../pipes/log-obj-validation.pipe';
import { PaginatedLogsResponse } from '../../../models/paginated-logs-response.model';
import { Pagination } from '../../../models/pagination.model';
import { LogObj } from '../../../entities/log-obj.entity';
import { LogObjService } from '../service/log-obj.service';

@Controller()
export class LogObjController {
    private readonly logger = new Logger(LogObjController.name);
    constructor(private logObjService: LogObjService){}

    @Get('/v1/health/logs')
    getLogs(@Query() { page, limit }: Pagination): Promise<PaginatedLogsResponse> {
      this.logger.log('Call GET /v1/health/logs');

      page = Number(page) ? Number(page) : 1;
      limit = Number(limit) ? Number(limit) : 10;

      return this.logObjService.findAll({ page, limit })
        .catch(err => {
          this.logger.error(err.message);
          throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    @Post('/v1/health/log')
    async log(@Body(new LogObjValidationPipe()) logObjData: LogObj): Promise<any> {
      this.logger.log('Call POST /v1/health/log');

      return this.logObjService.create(logObjData).catch(err => {
        this.logger.error(HttpStatus.INTERNAL_SERVER_ERROR + ' ' + err.message);
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    }
}
