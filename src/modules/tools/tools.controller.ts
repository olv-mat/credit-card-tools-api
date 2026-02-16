import { Body, Controller, Post } from '@nestjs/common';
import { CardNumberDto } from './dtos/CardNumber.dto';
import { ToolsService } from './tools.service';

@Controller('tools/validations')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/cards')
  public validateCard(@Body() dto: CardNumberDto): boolean {
    return this.toolsService.validateCard(dto);
  }
}
