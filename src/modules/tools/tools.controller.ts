import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CardNumberDto } from './dtos/card-number.dto';
import { CardValidationResponseDto } from './dtos/card-validation-response.dto';
import { ToolsService } from './tools.service';

@Controller('tools/validations')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/cards')
  @ApiOperation({ summary: 'Validate a credit card number' })
  public validateCard(@Body() dto: CardNumberDto): CardValidationResponseDto {
    return this.toolsService.validateCard(dto);
  }
}
