/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreditCardNumberController } from '../credit-card-number.controller';
import { makeCreditCardNumberDto } from './factories/credit-card-number-dto.factory';
import { makeCreditCardNumberResponseDto } from './factories/credit-card-number-response-dto.factory';

describe('CreditCardNumberController', () => {
  let creditCardNumberController: CreditCardNumberController;
  const creditCardNumberService = {
    validate: jest.fn(),
  } as any;

  beforeEach(() => {
    creditCardNumberController = new CreditCardNumberController(
      creditCardNumberService,
    );
  });

  describe('validate', () => {
    it('should call the service passing the correct argument and return mapped response', () => {
      const dto = makeCreditCardNumberDto();
      const expectedResponse = makeCreditCardNumberResponseDto();
      creditCardNumberService.validate.mockReturnValue(expectedResponse);
      const response = creditCardNumberController.validate(dto);
      expect(creditCardNumberService.validate).toHaveBeenCalledWith(dto);
      expect(response).toEqual(expectedResponse);
    });
  });
});
