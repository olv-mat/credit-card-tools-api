import { validate } from 'class-validator';
import { makeCreditCardNumberDto } from './factories/credit-card-number-dto.factory';

describe('CreditCardNumberDto', () => {
  it('should accept when valid', async () => {
    const dto = makeCreditCardNumberDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if empty', async () => {
    const dto = makeCreditCardNumberDto({ number: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if contains letters', async () => {
    const dto = makeCreditCardNumberDto({ number: '358986520611649A' });
    const errors = await validate(dto);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
  });

  it('should fail if the length is less than 16 characters', async () => {
    const dto = makeCreditCardNumberDto({ number: '335898652061164' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('isLength');
  });

  it('should fail if the size is greater than 16 characters', async () => {
    const dto = makeCreditCardNumberDto({ number: '33589865206116492' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('isLength');
  });
});
