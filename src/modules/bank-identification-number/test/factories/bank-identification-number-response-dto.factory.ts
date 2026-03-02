import { BankIdentificationNumberResponseDto } from '../../dtos/bank-identification-number-response.dto';

export const makeBankIdentificationNumberResponseDto = (
  override?: Partial<BankIdentificationNumberResponseDto>,
): BankIdentificationNumberResponseDto => {
  const dto = BankIdentificationNumberResponseDto.create('302596', 'Discover');
  return Object.assign(dto, override);
};
