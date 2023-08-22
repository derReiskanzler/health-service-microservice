import { ArgumentMetadata, HttpException, HttpStatus, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { HttpMethod } from '../models/http-method.model';
import { ServiceName } from '../models/service-name.model';
import { LogObj } from '../entities/log-obj.entity';

@Injectable()
export class LogObjValidationPipe implements PipeTransform {
  private readonly logger = new Logger(LogObjValidationPipe.name);

  transform(logObj: LogObj, metadata: ArgumentMetadata) {
    const { info } = logObj;
    let errorMessage = '';

    if(!info) {
        errorMessage = 'No info object in request body was passed!';
    }

    // Check required fields
    if (!info?.selfServiceName || !info?.requestedUrl || !info?.timestamp) {
        errorMessage = 'Missing required fields!';
    }

    // Check if selfServiceName is one of ServiceName enum
    if (!Object.values(ServiceName).includes(info?.selfServiceName)) {
        errorMessage = 'Invalid selfServiceName!';
    }

    // other service name is optional but if given check if otherServiceName is one of ServiceName enum
    if (info?.otherServiceName && !Object.values(ServiceName).includes(info?.otherServiceName)) {
        errorMessage = 'Invalid otherServiceName!';
    }

    // Check if method & code don't exist
    if (!(info?.httpMethod || info?.statusCode)) {
        errorMessage = 'Missing http method & status code. Please enter at least one of them!';
    }

    // Check if http method is valid
    if (info?.httpMethod && !Object.values(HttpMethod).includes(info?.httpMethod)) {
        errorMessage = 'Invalid http method!';
    }

    // Check if status code is valid
    if (info?.statusCode && !Object.values(HttpStatus).includes(info?.statusCode)) {
        errorMessage = 'Invalid status code!';
    }

    // Check type of requestedUrl
    if (typeof(info?.requestedUrl) !== 'string') {
        errorMessage = 'Type of requestedUrl is not string!';
    }

    // Check cluster url in requestedUrl
    if (!info?.requestedUrl.includes('http://cl-svc') &&
        !info?.requestedUrl.includes('https://frontend-service.api.datexis.com')
    ) {
        errorMessage = 'requestedUrl does not fit to the url\'s in the cluster!';
    }

    // Check if timestamp is valid
    if(new Date(info?.timestamp).toString() === 'Invalid Date') {
        errorMessage = 'timestamp is invalid!';
    }

    if (errorMessage) {
      this.logger.error(HttpStatus.BAD_REQUEST + ' ' + errorMessage);
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return logObj;
  }
}
