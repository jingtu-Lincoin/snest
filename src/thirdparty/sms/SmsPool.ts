class SmsPool {
  private codeMap: Map<string, string> = new Map<string, string>();

  public addCode(phone: string, code: string) {
    this.codeMap.set(phone, code);
  }

  public getCode(phone: string) {
    return this.codeMap.get(phone);
  }

  public removeCode(phone: string) {
    this.codeMap.delete(phone);
  }

  public verifyCode(phone: string, code: string) {
    const savedCode = this.getCode(phone);
    if (savedCode) {
      return savedCode === code;
    }
    return false;
  }
}
