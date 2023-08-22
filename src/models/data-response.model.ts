import { Tag } from './tag.model';

/**
 * `200` HTTP Response of `GET /v1/health/data` endpoint
 */
export interface DataResponse {
    /** Number of memes from StorageService */
    memeCount: number;
    /** List of tags from StorageService */
    popularTags: Tag[];
    /** Number of registered users from UserService */
    registeredUsersCount: number;
    /** Number of requests from FrontendService */
    requestCount: number;
}
