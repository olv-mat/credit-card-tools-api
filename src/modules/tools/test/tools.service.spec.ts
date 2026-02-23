/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { BINValidationContext } from 'src/common/modules/validation/bin/bin-validation.context';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { ToolsService } from '../tools.service';
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
      const validationResponse = makeCardValidationResponseDto();
      jest
        .spyOn(cardValidationContext, 'execute')
        .mockReturnValue(validationResponse);
      const result = toolsService.validateCard(dto);
      expect(result).toBe(validationResponse);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });

    it('should return false when card number is invalid', () => {
      const { toolsService, cardValidationContext } = context;
      const dto = makeCardNumberDto({ number: '4589865206116492' });
      const validationResponse = makeCardValidationResponseDto();
      jest
        .spyOn(cardValidationContext, 'execute')
        .mockReturnValue(validationResponse);
      const result = toolsService.validateCard(dto);
      expect(result).toBe(validationResponse);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });
  });
});
