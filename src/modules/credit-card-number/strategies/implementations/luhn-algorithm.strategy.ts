import { Injectable } from '@nestjs/common';
import { CreditCardNumberValidationDto } from '../../dtos/credit-card-number-validation.dto';
import { CreditCardNumberStrategy } from '../credit-card-number.strategy';

@Injectable()
export class LuhnAlgorithmStrategy extends CreditCardNumberStrategy {
  public validate(number: string): CreditCardNumberValidationDto {
    const sum = number
      .split('') // Convert The Input String Into an Array of Characters
      .reverse() // Reverse The Array as The Luhn Algorithm Processes From Right to Left
      .reduce((accumulator, character, index) => {
        let digit = Number(character);
        // Double The Value of Every Second Digit (Odd Indices)
        if (index % 2 !== 0) {
          digit *= 2;
          // If The Double is Greater Than 9, Subtract 9 to Get The Sum of Its Digits
          if (digit > 9) {
            digit -= 9;
          }
        }
        // Accumulate The Processed Digit Into The Total Sum
        return accumulator + digit;
      }, 0);
    // The Number is Valid if The Final Sum is a Multiple of 10
    const isValid = sum > 0 && sum % 10 === 0;
    return CreditCardNumberValidationDto.create(number, isValid);
  }
}
