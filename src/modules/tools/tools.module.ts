import { Module } from '@nestjs/common';
import { ValidationModule } from 'src/common/modules/validation/validation.module';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

@Module({
  imports: [ValidationModule],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
