import { CardValidationResponseDto } from 'src/modules/tools/dtos/card-validation-response.dto';

export const makeCardValidationResponseDto = (
  override?: Partial<CardValidationResponseDto>,
): CardValidationResponseDto => {
  const dto = CardValidationResponseDto.create('3589865206116492', true);
  return Object.assign(dto, override);
};
