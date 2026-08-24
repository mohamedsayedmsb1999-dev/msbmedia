const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

export function normalizePhone(value: string) {
  return value
    .trim()
    .replace(/[٠-٩]/g, digit => String(arabicDigits.indexOf(digit)))
    .replace(/[^0-9]/g, "");
}
