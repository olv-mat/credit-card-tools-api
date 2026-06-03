import { makeBankIdentificationNumberDto } from '../../bank-identification-number/test/factories/bank-identification-number-dto.factory';
import { makeBankIdentificationNumberResponseDto } from '../../bank-identification-number/test/factories/bank-identification-number-response-dto.factory';
import { BankIdentificationNumberController } from '../bank-identification-number.controller';
import { BankIdentificationNumberService } from '../bank-identification-number.service';

describe('BankIdentificationNumberController', () => {
  let bankIdentificationNumberController: BankIdentificationNumberController;
  const bankIdentificationNumberService = {
    validate: jest.fn(),
  };

  beforeEach(() => {
    bankIdentificationNumberController = new BankIdentificationNumberController(
      bankIdentificationNumberService as unknown as BankIdentificationNumberService,
    );
  });

  describe('validate', () => {
    it('should call the service, passing the correct argument and return the expected response', async () => {
      const dto = makeBankIdentificationNumberDto();
      const expectedResponse = makeBankIdentificationNumberResponseDto();
      bankIdentificationNumberService.validate.mockResolvedValue(
        expectedResponse,
      );
      const response = await bankIdentificationNumberController.validate(dto);
      expect(bankIdentificationNumberService.validate).toHaveBeenCalledWith(
        dto,
      );
      expect(response).toEqual(expectedResponse);
    });
  });
});
