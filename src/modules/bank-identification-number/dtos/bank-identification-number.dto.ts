import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class BankIdentificationNumberDto {
  @ApiProperty({ example: '302596' })
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  public readonly bin: string;
}
