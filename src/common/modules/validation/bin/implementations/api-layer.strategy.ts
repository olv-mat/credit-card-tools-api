import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { BINValidationResponseDto } from 'src/modules/tools/dtos/BINValidationResponse.dto';
import { BINValidationStrategy } from '../bin-validation.strategy';

// npm i @nestjs/axios axios

interface APILayerSuccessResponse {
  bank_name: string;
  country: string;
  url: string | null;
  type: string;
  scheme: string;
  bin: string;
}

interface APILayerErrorResponse {
  message: string;
}

type APILayerResponse = APILayerSuccessResponse | APILayerErrorResponse;

@Injectable()
export class APILayerStrategy extends BINValidationStrategy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async validate(bin: string): Promise<BINValidationResponseDto> {
    const apiKey = this.configService.getOrThrow<string>('API_LAYER_KEY');
    const endpoint = `https://api.apilayer.com/bincheck/${bin}`;
    const { data } = await firstValueFrom(
      this.httpService.get<APILayerResponse>(endpoint, {
        headers: { apikey: apiKey },
      }),
    );
    if ('bin' in data) {
      return BINValidationResponseDto.create(data.bin, data.scheme);
    }
    throw new BadRequestException('BIN not found');
  }
}
