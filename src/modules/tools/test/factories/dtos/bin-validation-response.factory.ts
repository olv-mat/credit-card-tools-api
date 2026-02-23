import { BINValidationResponseDto } from 'src/modules/tools/dtos/bin-validation-response.dto';

export const makeBINValidationResponseDto = (
  override?: Partial<BINValidationResponseDto>,
): BINValidationResponseDto => {
  const dto = BINValidationResponseDto.create('302596', 'Discover');
  return Object.assign(dto, override);
};
