import { Injectable } from '@nestjs/common';
import { CardValidationStrategy } from '../card-validation.strategy';

@Injectable()
export class LuhnAlgorithmStrategy extends CardValidationStrategy {
  public validate(number: string): boolean {
    const digits = number.split('');
    const reversedDigits = digits.reverse().map(Number);
    const processedDigits: string[] = [];
    reversedDigits.forEach((digit, position) => {
      const oddPosition = position % 2 != 0;
      const processedDigit = oddPosition ? String(digit * 2) : String(digit);
      processedDigits.push(processedDigit);
    });
    const adjustedDigits: number[] = [];
    processedDigits.forEach((digit) => {
      const twoDigits = digit.length == 2;
      const adjustedDigit = twoDigits
        ? digit.split('').reduce((accumulator, character) => {
            return accumulator + Number(character);
          }, 0)
        : Number(digit);
      adjustedDigits.push(adjustedDigit);
    });
    const sum: number = adjustedDigits.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return sum % 10 == 0;
  }
}
