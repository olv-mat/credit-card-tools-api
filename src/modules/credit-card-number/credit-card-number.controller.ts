import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerBadRequest } from 'src/common/swagger/responses.swagger';
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
  @ApiOperation({ summary: 'Generate a list of valid credit card numbers' })
  @ApiQuery({ name: 'amount', required: false, example: 10 })
  @SwaggerBadRequest('Amount must be between 1 and 10')
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
