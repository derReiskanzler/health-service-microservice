import { LogObj } from '../entities/log-obj.entity';

export interface PaginatedLogsResponse {
    data?: LogObj[];
    page?: number;
    limit?: number;
    totalCount?: number;
    totalPages?: number;
  }