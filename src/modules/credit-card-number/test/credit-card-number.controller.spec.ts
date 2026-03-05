/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreditCardNumberController } from '../credit-card-number.controller';
import { makeCreditCardNumberDto } from './factories/credit-card-number-dto.factory';
import { makeCreditCardNumberListDto } from './factories/credit-card-number-list-dto.factory';
import { makeCreditCardNumberValidationDto } from './factories/credit-card-number-validation-dto.factory';

describe('CreditCardNumberController', () => {
  let creditCardNumberController: CreditCardNumberController;
  const creditCardNumberService = {
    generate: jest.fn(),
    validate: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    creditCardNumberController = new CreditCardNumberController(
      creditCardNumberService,
    );
  });

  describe('generate', () => {
    it('should call the service and return the expected response', () => {
      const amount = 1;
      const expectedResponse = makeCreditCardNumberListDto();
      creditCardNumberService.generate.mockReturnValue(expectedResponse);
      const response = creditCardNumberController.generate(amount);
      expect(creditCardNumberService.generate).toHaveBeenCalledWith(amount);
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('validate', () => {
    it('should call the service and return the expected response', () => {
      const dto = makeCreditCardNumberDto();
      const expectedResponse = makeCreditCardNumberValidationDto();
      creditCardNumberService.validate.mockReturnValue(expectedResponse);
      const response = creditCardNumberController.validate(dto);
      expect(creditCardNumberService.validate).toHaveBeenCalledWith(dto);
      expect(response).toEqual(expectedResponse);
    });
  });
});
