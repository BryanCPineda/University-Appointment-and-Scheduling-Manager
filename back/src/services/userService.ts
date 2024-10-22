import { AppDataSource } from "../config/data-source"
import { UserCredentialDTO, UserDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO"
import { Credential } from "../entities/Credentials.entity"
import { User } from "../entities/User.entity"
import { UserRepository } from "../repositories/User.Repository"
import { checkUserCredentials, getCredentialService } from "./credentialService"

export const getUserService = async (): Promise<UserDTO[]>  => {
		const users: User[] = await UserRepository.find()
    return users
}

export const getUserByIdService = async (id: number): Promise<UserDTO> => {
		const userFound = await UserRepository.findOne({
				where: { id },
				relations: ['appointments']
		})
		if(!userFound) throw new Error(`El usuario con id: ${id} no fue encontrado`)
    else return userFound
}

export const registerUserService = async (user: UserRegisterDTO): Promise<User> => {

		const result = await AppDataSource.transaction(  async  (entityManager) => {
			const userCredentials: Credential | undefined = await getCredentialService(entityManager, user.username, user.password)
			const newUser: User = entityManager.create(User, {
				name: user.name,
				email: user.email,
				birthdate: new Date(user.birthdate),
				nDni: user.nDni,
				credentials: userCredentials
			})
			return await entityManager.save(newUser)
		})
		return result
	
}

export const loginUserService = async (userCredentials: UserCredentialDTO): Promise<UserLoginDTO> => {
	const credentialId: number | undefined = await checkUserCredentials(userCredentials.username, userCredentials.password)
	const userFound: User | null = await UserRepository.findOne(
		{ where: 
			{
				credentials: {  
						id: credentialId
				}
			}
		})
	return {
			login: true,
			user: {
				...userFound
			}
	}
} 
