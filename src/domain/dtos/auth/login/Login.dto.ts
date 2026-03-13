import { IRawJson } from "@/domain/interfaces/IRawJson";
import { ValidationMessages } from "@/domain/messages/validation.messages";

export interface ILoginDTO {
  email: string;
  password: string;
}

export class LoginDTO implements ILoginDTO {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(data: IRawJson): [string?, LoginDTO?] {
    const { email, password } = data;

    if (!email) {
      return [ValidationMessages.REQUIRED_FIELD("Email"), undefined];
    }

    if (!password) {
      return [ValidationMessages.REQUIRED_FIELD("Password"), undefined];
    }

    return [undefined, new LoginDTO(email, password)];
  }
}
