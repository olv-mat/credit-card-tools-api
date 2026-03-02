import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BankIdentificationNumberModule } from './modules/bank-identification-number/bank-identification-number.module';
import { CreditCardNumberModule } from './modules/credit-card-number/credit-card-number.module';

// npm i @nestjs/config
// npm i @nestjs/cache-manager cache-manager

@Module({
  imports: [
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
  providers: [],
})
export class AppModule {}
