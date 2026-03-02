import { validate } from 'class-validator';
import { makeBankIdentificationNumberDto } from './factories/bank-identification-number-dto.factory';

describe('BankIdentificationNumberDto', () => {
  it('should accept when valid', async () => {
    const dto = makeBankIdentificationNumberDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if empty', async () => {
    const dto = makeBankIdentificationNumberDto({ bin: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if contains letters', async () => {
    const dto = makeBankIdentificationNumberDto({ bin: '30259A' });
    const errors = await validate(dto);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
  });

  it('should fail if the length is less than 6 characters', async () => {
    const dto = makeBankIdentificationNumberDto({ bin: '30259' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if the size is greater than 6 characters', async () => {
    const dto = makeBankIdentificationNumberDto({ bin: '3025966' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });
});
