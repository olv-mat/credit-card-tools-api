import { CreditCardNumberController } from '../credit-card-number.controller';
import { CreditCardNumberService } from '../credit-card-number.service';
import { makeCreditCardNumberDto } from './factories/credit-card-number-dto.factory';
import { makeCreditCardNumberListDto } from './factories/credit-card-number-list-dto.factory';
import { makeCreditCardNumberValidationDto } from './factories/credit-card-number-validation-dto.factory';

describe('CreditCardNumberController', () => {
  let creditCardNumberController: CreditCardNumberController;
  const creditCardNumberService = {
    generate: jest.fn(),
    validate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    creditCardNumberController = new CreditCardNumberController(
      creditCardNumberService as unknown as CreditCardNumberService,
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
