import { LoginDTO, RegisterDTO, AuthResponseDTO } from "../dtos/AuthDTOs";

export interface IAuthRepository {
  signIn(dto: LoginDTO): Promise<AuthResponseDTO>;
  signUp(dto: RegisterDTO): Promise<AuthResponseDTO>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthResponseDTO | null>;
}
