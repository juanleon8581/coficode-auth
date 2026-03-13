/**
 * Generic validation messages applicable to any domain entity
 */
export const ValidationMessages = {
  REQUIRED_FIELD: (fieldName: string) => `${fieldName} is required`,
  INVALID_FORMAT: (fieldName: string) => `${fieldName} format is not valid`,
  TOO_SHORT: (fieldName: string, minLimit: number) =>
    `${fieldName} must be at least ${minLimit} characters`,
} as const;
