/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CardValidationResponseDto } from '../dtos/CardValidationResponse.dto';
import { ToolsController } from '../tools.controller';
import { makeCardNumberDto } from './factories/card-number-dto.factory';

describe('ToolsController', () => {
  let toolsController: ToolsController;
  const toolsService = {
    validateCard: jest.fn(),
  } as any;

  beforeEach(() => {
    toolsController = new ToolsController(toolsService);
  });

  describe('validateCard', () => {
    it('should call the service passing the correct argument and return mapped response', () => {
      const dto = makeCardNumberDto();
      toolsService.validateCard.mockReturnValue(true);
      const result = toolsController.validateCard(dto);
      expect(toolsService.validateCard).toHaveBeenCalledWith(dto);
      expect(result).toBeInstanceOf(CardValidationResponseDto);
    });
  });
});
