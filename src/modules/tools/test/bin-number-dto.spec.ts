import { validate } from 'class-validator';
import { makeBINNumberDto } from './factories/bin-number-dto.factory';

describe('BINNumberDto', () => {
  it('should accept when valid', async () => {
    const dto = makeBINNumberDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if empty', async () => {
    const dto = makeBINNumberDto({ bin: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if contains letters', async () => {
    const dto = makeBINNumberDto({ bin: '53685A' });
    const errors = await validate(dto);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
  });

  it('should fail if the length is less than 6 characters', async () => {
    const dto = makeBINNumberDto({ bin: '53685' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if the size is greater than 6 characters', async () => {
    const dto = makeBINNumberDto({ bin: '5368533' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('bin');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });
});
