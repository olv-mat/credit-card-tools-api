import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreditCardNumberDto {
  @ApiProperty({ example: '3589865206116492' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(16, 16)
  public readonly number: string;
}
