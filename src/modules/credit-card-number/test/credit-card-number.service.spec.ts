/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CreditCardNumberService } from '../credit-card-number.service';
import { CreditCardNumberContext } from '../strategies/credit-card-number.context';
import { makeCreditCardNumberDto } from './factories/credit-card-number-dto.factory';
import { makeCreditCardNumberValidationDto } from './factories/credit-card-number-validation-dto.factory';

type CreditCardNumberServiceContext = {
  creditCardNumberService: CreditCardNumberService;
  creditCardNumberContext: CreditCardNumberContext;
};

describe('CreditCardNumberService', () => {
  let context: CreditCardNumberServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        CreditCardNumberService,
        { provide: CreditCardNumberContext, useValue: { execute: jest.fn() } },
      ],
    }).compile();
    context = {
      creditCardNumberService: module.get(CreditCardNumberService),
      creditCardNumberContext: module.get(CreditCardNumberContext),
    };
  });

  describe('validate', () => {
    it('should return true when card number is valid', () => {
      const { creditCardNumberService, creditCardNumberContext } = context;
      const dto = makeCreditCardNumberDto();
      const expectedResponse = makeCreditCardNumberValidationDto();
      jest
        .spyOn(creditCardNumberContext, 'execute')
        .mockReturnValue(expectedResponse);
      const response = creditCardNumberService.validate(dto);
      expect(response).toEqual(expectedResponse);
      expect(response.isValid).toBe(true);
      expect(creditCardNumberContext.execute).toHaveBeenCalledWith(dto.number);
    });

    it('should return false when card number is invalid', () => {
      const { creditCardNumberService, creditCardNumberContext } = context;
      const dto = makeCreditCardNumberDto({ number: '3589865206116493' });
      const expectedResponse = makeCreditCardNumberValidationDto({
        isValid: false,
      });
      jest
        .spyOn(creditCardNumberContext, 'execute')
        .mockReturnValue(expectedResponse);
      const response = creditCardNumberService.validate(dto);
      expect(response).toBe(expectedResponse);
      expect(response.isValid).toBe(false);
      expect(creditCardNumberContext.execute).toHaveBeenCalledWith(dto.number);
    });
  });
});
