import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogObj } from '../../../entities/log-obj.entity';
import { Pagination } from '../../../models/pagination.model';
import { PaginatedLogsResponse } from '../../../models/paginated-logs-response.model';
import { Info } from '../../../entities/info.entity';

@Injectable()
export class LogObjService {
    private readonly logger = new Logger(LogObjService.name);

    constructor(
        @InjectRepository(LogObj)
        private logObjRepository: Repository<LogObj>,
        @InjectRepository(Info)
        private infoRepository: Repository<Info>,
    ) { }

    /**
     * Returns paginated logs based on passed page & limit
     * @returns {Promise<PaginatedLogsResponse>} Promise wrapping paginated logs
     * @memberof LogObjService
     */
    async findAll({ page, limit }: Pagination): Promise<PaginatedLogsResponse> {
        this.logger.log('Quering logs GET /v1/health/logs');

        const skip = page > 1 ? (page - 1) * limit : 0;

        const data = await this.logObjRepository
            .createQueryBuilder('logObj')
            .leftJoinAndSelect('logObj.info', 'info')
            .orderBy('info.timestamp', 'DESC')
            .skip(skip)
            .take(limit)
            .getMany();
        const totalCount = await this.logObjRepository.count();
        const totalPages = Math.ceil(totalCount/limit);

        return {
            totalCount,
            page,
            totalPages,
            limit,
            data
        } as PaginatedLogsResponse;
    }

    /**
     * Creates & returns log
     * @returns {Promise<LogObj>} Promise wrapping new created log
     * @memberof LogObjService
     */
    async create(logObj: LogObj): Promise<LogObj> {
        this.logger.log('Creating log POST /v1/health/log');

        const infoEntity = logObj.info as Info;
        const info = await this.infoRepository.save(infoEntity);
        const log = await this.logObjRepository.save(logObj);

        if (!info || !log) {
            this.logger.error(HttpStatus.INTERNAL_SERVER_ERROR + ' Error occured while saving LogObj & Info entity!');
            throw new HttpException('Error occured while saving LogObj & Info entity!', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return log;
    }
}
