import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ToolsModule } from './modules/tools/tools.module';

// npm i @nestjs/config
// npm i @nestjs/cache-manager cache-manager

@Module({
  imports: [
    ToolsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 1000,
      max: 1000,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
