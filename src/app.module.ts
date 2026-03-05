import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { BankIdentificationNumberModule } from './modules/bank-identification-number/bank-identification-number.module';
import { CreditCardNumberModule } from './modules/credit-card-number/credit-card-number.module';

// npm i @nestjs/config
// npm i @nestjs/cache-manager cache-manager
// npm i --save @nestjs/throttler

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 6,
          ttl: 60000,
        },
      ],
    }),
    BankIdentificationNumberModule,
    CreditCardNumberModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
      max: 1000,
    }),
    CreditCardNumberModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
