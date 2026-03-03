import { CreditCardNumberValidationDto } from '../../dtos/credit-card-number-validation.dto';

export const makeCreditCardNumberValidationDto = (
  override?: Partial<CreditCardNumberValidationDto>,
): CreditCardNumberValidationDto => {
  const dto = CreditCardNumberValidationDto.create('3589865206116492', true);
  return Object.assign(dto, override);
};
