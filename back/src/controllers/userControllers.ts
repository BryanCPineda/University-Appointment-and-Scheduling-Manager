import { Request, Response } from "express";
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userService";
import { UserCredentialDTO, UserDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { User } from "../entities/User.entity";
import { catchingError } from "../utils/catchinErros";

const getUsersController = async (req: Request, res: Response): Promise<void> => {
    const serviceResponse: UserDTO[] = await getUserService()
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios.",
      data: serviceResponse
    })
}

const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
        const serviceResponse: UserDTO = await getUserByIdService(parseInt(id,10)) 
        res.status(200).json(serviceResponse)
}

const resgisterUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
        const serviceResponse: User | undefined = await registerUserService(req.body)
        res.status(201).json({
          message: "Registro de un nuevo usuario.",
          data: serviceResponse
        })
}

const loginUserController = async (req: Request<unknown, unknown, UserCredentialDTO>, res:Response): Promise<void> => {
      const serviceResponse: UserLoginDTO = await loginUserService(req.body)
      res.status(200).json(serviceResponse)
}


const userControllers = {
  getUsersController: catchingError(getUsersController),
  getUserByIdController: catchingError(getUserByIdController),
  resgisterUserController: catchingError(resgisterUserController),
  loginUserController: catchingError(loginUserController),
}
  
export default userControllers