import { CardNumberDto } from '../../dtos/CardNumber.dto';

export const makeCardNumberDto = (
  override?: Partial<CardNumberDto>,
): CardNumberDto => {
  return Object.assign(new CardNumberDto(), {
    number: '3589865206116492',
    ...override,
  });
};
