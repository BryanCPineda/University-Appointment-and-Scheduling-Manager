import { Request, Response } from "express";
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userService";
import { UserDTO, UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { handleErrorResponse } from "./appointmentControllers";
import { User } from "../entities/User.entity";

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceResponse: UserDTO[] = await getUserService()
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios.",
      data: serviceResponse
    })
  } catch (error) {
    handleErrorResponse(error, res, "error al obtener todos los usuarios")
  }
}

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const serviceResponse: UserDTO = await getUserByIdService(parseInt(id,10)) 
        res.status(200).json({
          message: "Obtener el detalle de un usuario específico.",
          data: serviceResponse
        })
    } catch (error) {
      handleErrorResponse(error, res, "error al obtener el usuario por id")
    }
}

export const resgisterUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        const serviceResponse: User | undefined = await registerUserService(req.body)
        res.status(201).json({
          message: "Registro de un nuevo usuario.",
          data: serviceResponse
        })
    } catch (error) {
      handleErrorResponse(error, res, "error al registrar un nuevo usuario")
    }
}

export const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res:Response): Promise<void> => {
  try {
      const serviceResponse: UserLoginDTO = await loginUserService(req.body)
      res.status(201).json({
        message: "Login del usuario a la aplicación.",
        data: serviceResponse
      })
  } catch (error) {
    handleErrorResponse(error, res, "error al loguear un usuario")
  }
}