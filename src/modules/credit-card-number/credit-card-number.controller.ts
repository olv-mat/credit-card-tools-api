import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreditCardNumberService } from './credit-card-number.service';
import { CreditCardNumberListDto } from './dtos/credit-card-number-list.dto';
import { CreditCardNumberValidationDto } from './dtos/credit-card-number-validation.dto';
import { CreditCardNumberDto } from './dtos/credit-card-number.dto';

@ApiTags('Credit Card Number')
@Controller('credit-card-number')
export class CreditCardNumberController {
  constructor(
    private readonly creditCardNumberService: CreditCardNumberService,
  ) {}

  @Get()
  public generate(
    @Query('amount', new DefaultValuePipe(1), ParseIntPipe) amount: number,
  ): CreditCardNumberListDto {
    return this.creditCardNumberService.generate(amount);
  }

  @Post()
  @ApiOperation({ summary: 'Validate credit card number' })
  public validate(
    @Body() dto: CreditCardNumberDto,
  ): CreditCardNumberValidationDto {
    return this.creditCardNumberService.validate(dto);
  }
}
