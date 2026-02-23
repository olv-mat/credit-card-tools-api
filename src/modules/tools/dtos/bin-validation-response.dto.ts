export class BINValidationResponseDto {
  public readonly bin: string;
  public readonly scheme: string;

  private constructor(bin: string, scheme: string) {
    this.bin = bin;
    this.scheme = scheme;
  }

  public static create(bin: string, scheme: string): BINValidationResponseDto {
    return new BINValidationResponseDto(bin, scheme);
  }
}
