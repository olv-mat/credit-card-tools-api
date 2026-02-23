import { CardNumberDto } from 'src/modules/tools/dtos/card-number.dto';

export const makeCardNumberDto = (
  override?: Partial<CardNumberDto>,
): CardNumberDto => {
  return Object.assign(new CardNumberDto(), {
    number: '3589865206116492',
    ...override,
  });
};
