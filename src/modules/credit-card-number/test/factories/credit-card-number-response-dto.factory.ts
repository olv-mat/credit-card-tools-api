import { CreditCardNumberResponseDto } from '../../dtos/credit-card-number-response.dto';

export const makeCreditCardNumberResponseDto = (
  override?: Partial<CreditCardNumberResponseDto>,
): CreditCardNumberResponseDto => {
  const dto = CreditCardNumberResponseDto.create('3589865206116492', true);
  return Object.assign(dto, override);
};
