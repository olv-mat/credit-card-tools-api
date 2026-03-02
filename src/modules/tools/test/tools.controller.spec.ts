/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CardValidationResponseDto } from '../dtos/card-validation-response.dto';
import { ToolsController } from '../tools.controller';
import { makeCardNumberDto } from './factories/dtos/card-number.factory';
import { makeCardValidationResponseDto } from './factories/dtos/card-validation-response.factory';

describe('ToolsController', () => {
  let toolsController: ToolsController;
  const toolsService = {
    validateCard: jest.fn(),
    validateBIN: jest.fn(),
  } as any;

  beforeEach(() => {
    toolsController = new ToolsController(toolsService);
  });

  describe('validateCard', () => {
    it('should call the service passing the correct argument and return mapped response', () => {
      const dto = makeCardNumberDto();
      const validationResponse = makeCardValidationResponseDto();
      toolsService.validateCard.mockReturnValue(validationResponse);
      const result = toolsController.validateCard(dto);
      expect(toolsService.validateCard).toHaveBeenCalledWith(dto);
      expect(result).toBeInstanceOf(CardValidationResponseDto);
    });
  });
});
