import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch()
export class MicroserviceExceptionFilter implements RpcExceptionFilter<any> {
    catch(exception: any, host: ArgumentsHost): Observable<any> {
        if (exception instanceof HttpException) {
            return throwError(() => exception.getResponse());
        }
        const response = exception.response || exception;
        return throwError(() => response);
    }
}
