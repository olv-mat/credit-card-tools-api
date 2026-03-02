import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreditCardNumberService } from './credit-card-number.service';
import { CreditCardNumberResponseDto } from './dtos/credit-card-number-response.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';

@ApiTags('Credit Card Number')
@Controller('credit-card-number')
export class CreditCardNumberController {
  constructor(
    private readonly creditCardNumberService: CreditCardNumberService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Validate credit card number' })
  public validate(
    @Body() dto: CreditCardNumberDto,
  ): CreditCardNumberResponseDto {
    return this.creditCardNumberService.validate(dto);
  }
}
