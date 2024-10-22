import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO";
import { cancelStatusAppointmentService, getAppointmentByIdService, getAppointmentService, registerAppointmentService } from "../services/appointmentService";
import { catchingError } from "../utils/catchinErros";

const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
      const serviceResponse = await getAppointmentService()
      res.status(200).json({
        message: "Obtener el listado de todos los turnos de todos los usuarios.",
        data: serviceResponse
      })
}

const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params
    const serviceResponse = await getAppointmentByIdService(id)
    res.status(200).json({
      message: "Obtener el detalle de un turno específico.",
      data: serviceResponse
    })
}

const registerAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
    await registerAppointmentService(req.body)
    res.status(201).json({
      message: "Cita agendada con exito",
    })
}

const cancelStatusAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { id } = req.params
  
    const serviceResponse = await cancelStatusAppointmentService(id)
    res.status(200).json({
      message: "Cita cancelada con exito",
      data: serviceResponse
    })
}

const appointmentsControllers = {
  getAppointmentsController: catchingError(getAppointmentsController),
  getAppointmentByIdController: catchingError(getAppointmentByIdController),
  registerAppointmentController: catchingError(registerAppointmentController),
  cancelStatusAppointmentController: catchingError(cancelStatusAppointmentController),
}

export default appointmentsControllers