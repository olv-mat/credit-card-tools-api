import { BINNumberDto } from '../../dtos/BINNumber.dto';

export const makeBINNumberDto = (
  override?: Partial<BINNumberDto>,
): BINNumberDto => {
  return Object.assign(new BINNumberDto(), {
    bin: '536853',
    ...override,
  });
};
