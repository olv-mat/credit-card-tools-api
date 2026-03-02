/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { makeBankIdentificationNumberDto } from '../../bank-identification-number/test/factories/bank-identification-number-dto.factory';
import { makeBankIdentificationNumberResponseDto } from '../../bank-identification-number/test/factories/bank-identification-number-response-dto.factory';
import { BankIdentificationNumberService } from '../bank-identification-number.service';
import { BankIdentificationNumberContext } from '../strategies/bank-identification-number.context';

type BankIdentificationNumberServiceContext = {
  bankIdentificationNumberService: BankIdentificationNumberService;
  bankIdentificationNumberContext: BankIdentificationNumberContext;
};

describe('BankIdentificationNumberService', () => {
  let context: BankIdentificationNumberServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        BankIdentificationNumberService,
        {
          provide: BankIdentificationNumberContext,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();
    context = {
      bankIdentificationNumberService: module.get(
        BankIdentificationNumberService,
      ),
      bankIdentificationNumberContext: module.get(
        BankIdentificationNumberContext,
      ),
    };
  });

  describe('validate', () => {
    it('should return bank identification number validation details', async () => {
      const {
        bankIdentificationNumberService,
        bankIdentificationNumberContext,
      } = context;
      const dto = makeBankIdentificationNumberDto();
      const expectedResponse = makeBankIdentificationNumberResponseDto();
      jest
        .spyOn(bankIdentificationNumberContext, 'execute')
        .mockResolvedValue(expectedResponse);
      const response = await bankIdentificationNumberService.validate(dto);
      expect(response).toEqual(expectedResponse);
      expect(bankIdentificationNumberContext.execute).toHaveBeenCalledWith(
        dto.bin,
      );
    });
  });
});
