import { IAuthRepository } from "../repositories/IAuthRepository";
import { LoginDTO, RegisterDTO, AuthResponseDTO } from "../dtos/AuthDTOs";
import { ValidationError } from "../errors/DomainError";

export class AuthUseCase {
  private readonly authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    if (!dto.email) throw new ValidationError("Email is required");
    return this.authRepository.signIn(dto);
  }

  async register(dto: RegisterDTO): Promise<AuthResponseDTO> {
    if (!dto.email) throw new ValidationError("Email is required");
    return this.authRepository.signUp(dto);
  }

  async logout(): Promise<void> {
    return this.authRepository.signOut();
  }

  async getSessionUser(): Promise<AuthResponseDTO | null> {
    return this.authRepository.getCurrentUser();
  }
}
