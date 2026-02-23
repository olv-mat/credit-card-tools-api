import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CardNumberDto {
  @ApiProperty({ example: '3589865206116492' })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(16)
  @MaxLength(16)
  public readonly number: string;
}
