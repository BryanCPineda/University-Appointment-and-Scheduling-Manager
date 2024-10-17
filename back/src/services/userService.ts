
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO"

export const getUserService = async (): Promise<void>  => {}

export const getUserByIdService = async (id: string): Promise<string> => {
  return id
}

export const registerUserService = async (user: UserRegisterDTO): Promise<UserRegisterDTO> => {
  return user
}

export const loginUserService = async (userCredentials: UserLoginDTO): Promise<UserLoginDTO> => {
      return userCredentials
} 