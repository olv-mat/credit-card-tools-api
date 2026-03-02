/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CardValidationContext } from 'src/common/modules/validation/card/card-validation.context';
import { ToolsService } from '../tools.service';
import { makeCardNumberDto } from './factories/dtos/card-number.factory';
import { makeCardValidationResponseDto } from './factories/dtos/card-validation-response.factory';

type ToolsServiceContext = {
  toolsService: ToolsService;
  cardValidationContext: CardValidationContext;
};

describe('ToolsService', () => {
  let context: ToolsServiceContext;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        ToolsService,
        { provide: CardValidationContext, useValue: { execute: jest.fn() } },
      ],
    }).compile();
    context = {
      toolsService: module.get(ToolsService),
      cardValidationContext: module.get(CardValidationContext),
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
});
