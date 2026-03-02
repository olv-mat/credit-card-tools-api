import { CreditCardNumberDto } from '../../dtos/credit-card-number.dto';

export const makeCreditCardNumberDto = (
  override?: Partial<CreditCardNumberDto>,
): CreditCardNumberDto => {
  return Object.assign(new CreditCardNumberDto(), {
    number: '3589865206116492',
    ...override,
  });
};
