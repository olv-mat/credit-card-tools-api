/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { makeBankIdentificationNumberDto } from '../../bank-identification-number/test/factories/bank-identification-number-dto.factory';
import { makeBankIdentificationNumberResponseDto } from '../../bank-identification-number/test/factories/bank-identification-number-response-dto.factory';
import { BankIdentificationNumberController } from '../bank-identification-number.controller';

describe('BankIdentificationNumberController', () => {
  let bankIdentificationNumberController: BankIdentificationNumberController;
  const bankIdentificationNumberService = {
    validate: jest.fn(),
  } as any;

  beforeEach(() => {
    bankIdentificationNumberController = new BankIdentificationNumberController(
      bankIdentificationNumberService,
    );
  });

  describe('validate', () => {
    it('should call the service passing the correct argument and return mapped response', async () => {
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
