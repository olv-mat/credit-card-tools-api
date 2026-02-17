import { Body, Controller, Post } from '@nestjs/common';
import { CardNumberDto } from './dtos/CardNumber.dto';
import { CardValidationResponseDto } from './dtos/CardValidationResponse.dto';
import { ToolsService } from './tools.service';

@Controller('tools/validations')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/cards')
  public validateCard(@Body() dto: CardNumberDto): CardValidationResponseDto {
    const isValid = this.toolsService.validateCard(dto);
    return CardValidationResponseDto.create(isValid);
  }
}
