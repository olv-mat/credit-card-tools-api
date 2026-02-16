import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CardNumberDto {
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(16)
  @MaxLength(16)
  public readonly number: string;
}
