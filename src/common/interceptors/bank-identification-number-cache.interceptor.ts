import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { BankIdentificationNumberResponseDto } from 'src/modules/bank-identification-number/dtos/bank-identification-number-response.dto';

interface BankIdentificationNumberBody {
  bin: string;
}

@Injectable()
export class BankIdentificationNumberCacheInterceptor implements NestInterceptor<BankIdentificationNumberResponseDto> {
  private readonly logger = new Logger(
    BankIdentificationNumberCacheInterceptor.name,
  );

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      Request & { body: BankIdentificationNumberBody }
    >();
    const bin = request.body?.bin;
    if (!bin) return next.handle();
    return from(this.cache.get<BankIdentificationNumberResponseDto>(bin)).pipe(
      switchMap((cached) => {
        if (cached) {
          this.logger.log(`Cache hit for ${bin}`);
          return of(cached);
        }
        return next.handle().pipe(
          tap((response: BankIdentificationNumberResponseDto) => {
            this.logger.warn(`Cache miss for ${bin}`);
            void this.cache.set(bin, response, 60 * 60 * 1000);
          }),
        );
      }),
    );
  }
}
