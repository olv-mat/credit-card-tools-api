import { BankIdentificationNumberDto } from '../../dtos/bank-identification-number.dto';

export const makeBankIdentificationNumberDto = (
  override?: Partial<BankIdentificationNumberDto>,
): BankIdentificationNumberDto => {
  return Object.assign(new BankIdentificationNumberDto(), {
    bin: '302596',
    ...override,
  });
};
