import { IRawJson } from "@/domain/interfaces/IRawJson";
import { ValidationMessages } from "@/domain/messages/validation.messages";

export interface IRegisterDTO {
  email: string;
  password?: string;
  fullName?: string;
}

export class RegisterDTO implements IRegisterDTO {
  private constructor(
    public email: string,
    public password: string,
    public fullName: string,
  ) {}

  static create(data: IRawJson): [string?, RegisterDTO?] {
    const { email, password, fullName } = data;
    if (!email) return [ValidationMessages.REQUIRED_FIELD("Email"), undefined];
    if (!password) return [ValidationMessages.REQUIRED_FIELD("Password"), undefined];
    if (!fullName) return [ValidationMessages.REQUIRED_FIELD("Full name"), undefined];
    return [undefined, new RegisterDTO(email, password, fullName)];
  }
}
