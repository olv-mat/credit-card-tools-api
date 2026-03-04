import { CreditCardNumberListDto } from '../../dtos/credit-card-number-list.dto';

export const makeCreditCardNumberListDto = (
  override?: Partial<CreditCardNumberListDto>,
): CreditCardNumberListDto => {
  const dto = CreditCardNumberListDto.create(['3589865206116492']);
  return Object.assign(dto, override);
};
