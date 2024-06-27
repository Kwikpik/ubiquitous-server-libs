import { Generators, Modules } from "../src";

const { mail } = Modules;

describe("KWIKPIK: EMAIL TESTS", () => {
  it("should send emails", async () => {
    const module = mail.initializeMailingModule();
    const message = await module.sendAccountVerificationOTP(
      "javaprodigy56@gmail.com",
      "merchant",
      "Kingsley Victor",
      Generators.generate(6, { upperCase: false, specialChar: false, alphabets: false, digits: true })
    );
    expect(message).toBeTruthy();
  });
});
