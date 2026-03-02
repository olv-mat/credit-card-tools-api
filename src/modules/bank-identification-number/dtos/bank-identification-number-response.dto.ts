export class BankIdentificationNumberResponseDto {
  public readonly bin: string;
  public readonly scheme: string;

  private constructor(bin: string, scheme: string) {
    this.bin = bin;
    this.scheme = scheme;
  }

  public static create(
    bin: string,
    scheme: string,
  ): BankIdentificationNumberResponseDto {
    return new BankIdentificationNumberResponseDto(bin, scheme);
  }
}
