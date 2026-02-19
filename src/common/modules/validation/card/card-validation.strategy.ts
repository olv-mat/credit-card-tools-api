export abstract class CardValidationStrategy {
  public abstract validate(number: string): boolean;
}
