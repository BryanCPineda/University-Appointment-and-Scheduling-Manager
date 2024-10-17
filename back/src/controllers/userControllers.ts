import { Request, Response } from "express";
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userService";
import { UserLoginDTO, UserRegisterDTO } from "../dtos/UserDTO";

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceResponse: void = await getUserService()
    res.status(200).json({
      message: "Obtener el listado de todos los usuarios.",
      data: serviceResponse
    })
  } catch (error) {
    res.status(500).json({
      message: "hubo un error en la aplicacion",
      error: error
    })
  }
}

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const { id } = req.params
    try {
        const serviceResponse: string = await getUserByIdService(id) 
        res.status(200).json({
          message: "Obtener el detalle de un usuario específico.",
          data: serviceResponse
        })
    } catch (error) {
        res.status(500).json({
          message: "hubo un error en la aplicacion",
          error: error
        })
    }
}

export const resgisterUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        const serviceResponse: UserRegisterDTO = await registerUserService(req.body)
        res.status(201).json({
          message: "Registro de un nuevo usuario.",
          data: serviceResponse
        })

    } catch (error) {
        res.status(500).json({
          message: "hubo un error en la aplicacion",
          error: error
        })
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
      res.status(500).json({
        message: "hubo un error en la aplicacion",
        error: error
      })
  }
}