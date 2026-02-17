/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CardValidationContext } from 'src/common/modules/validation/contexts/card-validation.context';
import { ToolsService } from '../tools.service';
import { makeCardNumberDto } from './factories/card-number-dto.factory';

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
      jest.spyOn(cardValidationContext, 'execute').mockReturnValue(true);
      const result = toolsService.validateCard(dto);
      expect(result).toBe(true);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });

    it('should return false when card number is invalid', () => {
      const { toolsService, cardValidationContext } = context;
      const dto = makeCardNumberDto({ number: '4589865206116492' });
      jest.spyOn(cardValidationContext, 'execute').mockReturnValue(false);
      const result = toolsService.validateCard(dto);
      expect(result).toBe(false);
      expect(cardValidationContext.execute).toHaveBeenCalledWith(dto.number);
    });
  });
});
