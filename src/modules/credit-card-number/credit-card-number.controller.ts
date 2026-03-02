import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreditCardNumberService } from './credit-card-number.service';
import { CreditCardNumberResponseDto } from './dtos/credit-card-number-response.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';

@Controller('credit-card-number')
export class CreditCardNumberController {
  constructor(
    private readonly creditCardNumberService: CreditCardNumberService,
  ) {}

  @Post()
  @ApiOperation({ summary: '' })
  public validate(
    @Body() dto: CreditCardNumberDto,
  ): CreditCardNumberResponseDto {
    return this.creditCardNumberService.validate(dto);
  }
}
