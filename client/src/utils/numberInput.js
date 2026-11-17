/**
 * Cleans the raw text of a number input while the user is typing.
 * - Keeps the box empty when everything is deleted (instead of forcing 0)
 * - Removes leading zeros as soon as a new digit is typed ("05" -> "5", "007" -> "7")
 * - Keeps decimals intact ("0.5" stays "0.5")
 * The value is kept as a string in form state; convert it with toNumber() when saving.
 */
export const cleanNumberInput = (raw) => {
  if (raw === '' || raw === null || raw === undefined) return '';
  const str = String(raw);
  return str.replace(/^(-?)0+(?=\d)/, '$1');
};

/**
 * Converts a form value to a number when saving. Empty values fall back to `fallback`.
 */
export const toNumber = (value, fallback = 0) => {
  if (value === '' || value === null || value === undefined) return fallback;
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
};

export const isEmptyNumber = (value) => value === '' || value === null || value === undefined;
