import { BINNumberDto } from 'src/modules/tools/dtos/bin-number.dto';

export const makeBINNumberDto = (
  override?: Partial<BINNumberDto>,
): BINNumberDto => {
  return Object.assign(new BINNumberDto(), {
    bin: '302596',
    ...override,
  });
};
