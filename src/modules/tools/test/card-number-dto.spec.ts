import { validate } from 'class-validator';
import { makeCardNumberDto } from './factories/card-number-dto.factory';

describe('CardNumberDto', () => {
  it('should accept when valid', async () => {
    const dto = makeCardNumberDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if empt', async () => {
    const dto = makeCardNumberDto({ number: '' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail if contains letters', async () => {
    const dto = makeCardNumberDto({ number: '358986520611649A' });
    const errors = await validate(dto);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
  });

  it('should fail if the length is less than 16 characters', async () => {
    const dto = makeCardNumberDto({ number: '589865206116492' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail if the size is greater than 16 characters', async () => {
    const dto = makeCardNumberDto({ number: '33589865206116492' });
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].property).toBe('number');
    expect(errors[0].constraints).toHaveProperty('maxLength');
  });
});
