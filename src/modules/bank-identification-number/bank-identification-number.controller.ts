import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BankIdentificationNumberCacheInterceptor } from 'src/common/interceptors/bank-identification-number-cache.interceptor';
import { SwaggerBadRequest } from 'src/common/swagger/responses.swagger';
import { BankIdentificationNumberService } from './bank-identification-number.service';
import { BankIdentificationNumberResponseDto } from './dtos/bank-identification-number-response.dto';
import { BankIdentificationNumberDto } from './dtos/bank-identification-number.dto';

@ApiTags('Bank Identification Number')
@Controller('bank-identification-number')
export class BankIdentificationNumberController {
  constructor(
    private readonly bankIdentificationNumberService: BankIdentificationNumberService,
  ) {}

  @Post()
  @UseInterceptors(BankIdentificationNumberCacheInterceptor)
  @ApiOperation({
    summary:
      'Identify card scheme by bank identification number with automated caching',
  })
  @SwaggerBadRequest('BIN not found')
  public async validate(
    @Body() dto: BankIdentificationNumberDto,
  ): Promise<BankIdentificationNumberResponseDto> {
    return this.bankIdentificationNumberService.validate(dto);
  }
}
