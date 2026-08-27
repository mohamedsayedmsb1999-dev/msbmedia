const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhone(value: string) {
  return value
    .trim()
    .replace(/[٠-٩]/g, digit => String(arabicDigits.indexOf(digit)))
    .replace(/[^0-9]/g, "");
}

export function validateInternationalPhone(value: string) {
  const normalizedDigits = value.trim().replace(/[٠-٩]/g, digit => String(arabicDigits.indexOf(digit)));
  const candidate = normalizedDigits.startsWith("00") ? `+${normalizedDigits.slice(2)}` : normalizedDigits;
  const parsed = parsePhoneNumberFromString(candidate, candidate.startsWith("+") ? undefined : "EG");
  return Boolean(parsed?.isValid());
}
