import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BINNumberDto } from './dtos/BINNumber.dto';
import { BINValidationResponseDto } from './dtos/BINValidationResponse.dto';
import { CardNumberDto } from './dtos/CardNumber.dto';
import { CardValidationResponseDto } from './dtos/CardValidationResponse.dto';
import { ToolsService } from './tools.service';

@Controller('tools/validations')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('/cards')
  @ApiOperation({ summary: 'Validate a credit card number' })
  public validateCard(@Body() dto: CardNumberDto): CardValidationResponseDto {
    return this.toolsService.validateCard(dto);
  }

  @Post('/bins')
  public async validateBIN(
    @Body() dto: BINNumberDto,
  ): Promise<BINValidationResponseDto> {
    return this.toolsService.validateBIN(dto);
  }
}
