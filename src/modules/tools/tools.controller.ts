import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SwaggerBadRequest } from 'src/common/swagger/responses.swagger';
import { BINNumberDto } from './dtos/bin-number.dto';
import { BINValidationResponseDto } from './dtos/bin-validation-response.dto';
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

  @Post('/bins')
  @ApiOperation({ summary: 'Validate card BIN and identify card scheme' })
  @SwaggerBadRequest('BIN not found')
  public async validateBIN(
    @Body() dto: BINNumberDto,
  ): Promise<BINValidationResponseDto> {
    return this.toolsService.validateBIN(dto);
  }
}
