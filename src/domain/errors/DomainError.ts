export class DomainError extends Error {
  public code: string;
  public details?: unknown;

  constructor(
    message: string,
    code: string = "DOMAIN_ERROR",
    details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string, details?: unknown) {
    super(message, "AUTHENTICATION_ERROR", details);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", details);
  }
}
