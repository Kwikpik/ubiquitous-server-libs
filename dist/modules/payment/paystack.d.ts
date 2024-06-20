declare class PaystackPaymentModule {
  private $;
  constructor(secret?: string);
  private checkHTTPModule;
  checkChargeUsingPin(
    pin: string,
    reference: string
  ): Promise<
    import("../../shared/http").ResponseInterface<string> | import("../../shared/http").ResponseInterface<unknown>
  >;
}
/**
 *
 * @param secret Paystack secret key
 * @returns
 */
export declare const initPaystackPayment: (secret?: string) => PaystackPaymentModule;
export {};
//# sourceMappingURL=paystack.d.ts.map
