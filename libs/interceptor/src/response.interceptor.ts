import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
    code: number;
    message: string;
    data: T;
}

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => ({
                code: response.statusCode,
                message: 'Success',
                data,
            })),
        );
    }
}