import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { Appointment } from "../entities/Appointments.entity"
import { Status } from "../interfaces/AppointmentInterface"
import { AppointmentRepository } from "../repositories/Appointment.Repository"
import { CustomError } from "../utils/customError"
import { getUserByIdService } from "./userService"


export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointmentsFound = await AppointmentRepository.find()
		if(appointmentsFound.length === 0) throw new CustomError(404, "No se encontraron citas")  
		else return appointmentsFound
}

export const getAppointmentByIdService = async (id: string):  Promise<Appointment | null> => {
    const appointmentFound = await AppointmentRepository.findOne({
			where:{
				id: parseInt(id,10)
			}
		})
    if(!appointmentFound) throw new CustomError(404, `La cita con el id ${id} no fue encontrada`)
    else return appointmentFound
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDTO ): Promise<Appointment> => {
    await getUserByIdService(appointmentData.userId)
    AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time)
		await AppointmentRepository.validateExistingAppointment(appointmentData.userId, new Date(appointmentData.date), appointmentData.time)

		const newAppointment = AppointmentRepository.create({
			date: new Date(appointmentData.date),
			time: appointmentData.time,
			user: {
				id: appointmentData.userId
			}
		})
		return await AppointmentRepository.save(newAppointment)
}

export const cancelStatusAppointmentService = async(id: string): Promise<void> => {
    const appointmentFound = await AppointmentRepository.findOne({
			where: {
				id: parseInt(id, 10)
			}
		})
    if(!appointmentFound) throw new CustomError(404, `La cita con el id ${id} no fue encontrada`)
    appointmentFound.status = Status.cancelled
    await AppointmentRepository.save(appointmentFound)
}



