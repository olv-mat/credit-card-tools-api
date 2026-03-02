import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { BankIdentificationNumberResponseDto } from '../../dtos/bank-identification-number-response.dto';
import { BankIdentificationNumberStrategy } from '../bank-identification-number.strategy';

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
export class APILayerStrategy extends BankIdentificationNumberStrategy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async validate(
    bin: string,
  ): Promise<BankIdentificationNumberResponseDto> {
    try {
      const apiKey = this.configService.getOrThrow<string>('API_LAYER_KEY');
      const endpoint = `https://api.apilayer.com/bincheck/${bin}`;
      const { data } = await firstValueFrom(
        this.httpService.get<APILayerResponse>(endpoint, {
          headers: { apikey: apiKey },
        }),
      );
      if (!data || !('bin' in data)) {
        throw new Error();
      }
      return BankIdentificationNumberResponseDto.create(data.bin, data.scheme);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new BadRequestException('BIN not found');
      }
      throw error;
    }
  }
}
