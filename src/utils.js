export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

// Letters only (plus spaces, apostrophes, hyphens), at least one character.
export const validateName = (name) =>
  /^[A-Za-z][A-Za-z\s'-]*$/.test(String(name).trim());

// Optional field: empty is fine, otherwise 10 digits (US style).
export const validatePhone = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 0 || digits.length === 10;
};
