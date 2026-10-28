const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ENROLLMENT_ID_REGEX = /^[A-Za-z0-9._-]{4,32}$/;

export const PASSWORD_MIN_LENGTH = 8;

export function validateRequired(value, label = 'This field') {
  if (!value || !String(value).trim()) return `${label} is required`;
  return '';
}

export function validateEmail(value) {
  const required = validateRequired(value, 'Email');
  if (required) return required;
  if (!EMAIL_REGEX.test(value.trim())) return 'Enter a valid email address';
  return '';
}

/** Login accepts either an email or an enrollment ID. */
export function validateIdentifier(value) {
  const required = validateRequired(value, 'Email or Enrollment ID');
  if (required) return required;
  const v = value.trim();
  if (v.includes('@')) {
    return EMAIL_REGEX.test(v) ? '' : 'Enter a valid email address';
  }
  return ENROLLMENT_ID_REGEX.test(v)
    ? ''
    : 'Enter a valid email or enrollment ID (4+ letters/numbers)';
}

export function validateFullName(value) {
  const required = validateRequired(value, 'Full name');
  if (required) return required;
  if (value.trim().length < 2) return 'Name must be at least 2 characters';
  return '';
}

/** Used on registration only. Login just checks presence. */
export function validateNewPassword(value) {
  const required = validateRequired(value, 'Password');
  if (required) return required;
  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return 'Password must include at least one letter and one number';
  }
  return '';
}

export function validateConfirmPassword(password, confirm) {
  const required = validateRequired(confirm, 'Confirm password');
  if (required) return required;
  if (password !== confirm) return 'Passwords do not match';
  return '';
}

/** True when the errors object has no non-empty messages. */
export function isValid(errors) {
  return Object.values(errors).every((msg) => !msg);
}