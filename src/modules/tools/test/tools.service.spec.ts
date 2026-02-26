/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { BINValidationContext } from 'src/common/modules/validation/bin/bin-validation.context';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { ToolsService } from '../tools.service';
import { makeBINNumberDto } from './factories/dtos/bin-number.factory';
import { makeBINValidationResponseDto } from './factories/dtos/bin-validation-response.factory';
import { makeCardNumberDto } from './factories/dtos/card-number.factory';
import { makeCardValidationResponseDto } from './factories/dtos/card-validation-response.factory';

type ToolsServiceContext = {
  toolsService: ToolsService;
  cardValidationContext: CardValidationContext;
  binValidationContext: BINValidationContext;
};

describe('ToolsService', () => {
  let context: ToolsServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        ToolsService,
        { provide: CardValidationContext, useValue: { execute: jest.fn() } },
        { provide: BINValidationContext, useValue: { execute: jest.fn() } },
      ],
    }).compile();
    context = {
      toolsService: module.get(ToolsService),
      cardValidationContext: module.get(CardValidationContext),
      binValidationContext: module.get(BINValidationContext),
    };
  });

  describe('validateCard', () => {
    it('should return true when card number is valid', () => {
      const { toolsService, cardValidationContext } = context;
      const dto = makeCardNumberDto();
      const expectedResponse = makeCardValidationResponseDto();
      jest
        .spyOn(cardValidationContext, 'execute')
        .mockReturnValue(expectedResponse);
      const response = toolsService.validateCard(dto);
      expect(response).toEqual(expectedResponse);
      expect(response.isValid).toBe(true);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });

    it('should return false when card number is invalid', () => {
      const { toolsService, cardValidationContext } = context;
      const dto = makeCardNumberDto({ number: '3589865206116493' });
      const expectedResponse = makeCardValidationResponseDto({
        isValid: false,
      });
      jest
        .spyOn(cardValidationContext, 'execute')
        .mockReturnValue(expectedResponse);
      const response = toolsService.validateCard(dto);
      expect(response).toBe(expectedResponse);
      expect(response.isValid).toBe(false);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });
  });

  describe('validateBIN', () => {
    it('should return BIN validation details', async () => {
      const { toolsService, binValidationContext } = context;
      const dto = makeBINNumberDto();
      const expectedResponse = makeBINValidationResponseDto();
      jest
        .spyOn(binValidationContext, 'execute')
        .mockResolvedValue(expectedResponse);
      const response = await toolsService.validateBIN(dto);
      expect(response).toEqual(expectedResponse);
      expect(binValidationContext.execute).toHaveBeenCalledWith(dto.bin);
    });
  });
});
