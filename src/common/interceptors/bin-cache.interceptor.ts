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
import { BINValidationResponseDto } from 'src/modules/tools/dtos/bin-validation-response.dto';

interface BINBody {
  bin: string;
}

@Injectable()
export class BINCacheInterceptorInterceptor implements NestInterceptor<BINValidationResponseDto> {
  private readonly logger = new Logger(BINCacheInterceptorInterceptor.name);

  // Inject The Cache Manager to Interact With The Storage
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Extract the Request Object And The BIN From The Body
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: BINBody }>();
    const bin = request.body?.bin;

    // If no BIN is Provided, Skip Caching And Proceed to The Controller
    if (!bin) {
      return next.handle();
    }

    // Check if The BIN Data Exists in The Cache
    return from(this.cache.get<BINValidationResponseDto>(bin)).pipe(
      switchMap((cached) => {
        // If Found, Log The Hit And Return The Cached Data Immediately
        if (cached) {
          this.logger.log(`Cache hit for ${bin}`);
          return of(cached);
        }
        // If Not Found, Execute The Request And Cache The Result
        return next.handle().pipe(
          tap((response: BINValidationResponseDto) => {
            this.logger.warn(`Cache miss for ${bin}`);
            void this.cache.set(bin, response, 60 * 60 * 1000);
          }),
        );
      }),
    );
  }
}
