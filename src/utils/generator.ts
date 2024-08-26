const digits = "0123456789";
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const upperCase = alphabets.toUpperCase();
const specialChar = "#!&@";

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function generate(
    length: number = 6,
    options: {
        digits?: boolean;
        alphabets?: boolean;
        upperCase?: boolean;
        specialChar?: boolean;
    } = {
        digits: true,
        alphabets: true,
        upperCase: true,
        specialChar: false,
    }
): string {
    const allowedCharacters =
        ((options.digits || "") && digits) +
        ((options.alphabets || "") && alphabets) +
        ((options.upperCase || "") && upperCase) +
        ((options.specialChar || "") && specialChar);
    let code = "";
    while (code.length < length) {
        const index = randomNumber(0, allowedCharacters.length - 1);
        code += allowedCharacters[index];
    }
    return code;
}
