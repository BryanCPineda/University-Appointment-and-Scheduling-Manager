import { AppointmentRegisterDTO } from "../dtos/AppointmentDTO"
import { Appointment, Status } from "../interfaces/AppointmentInterface"
import { getUserByIdService } from "./userService"

const appointmentList: Appointment[] = []
let id: number = 1

export const getAppointmentService = async (): Promise<Appointment[]> => {
    return appointmentList
}

export const getAppointmentByIdService = async (id: string):  Promise<Appointment> => {
    const appointmentFound = appointmentList.find(appointment => appointment.id === parseInt(id, 10))
    if(!appointmentFound) throw new Error(`La cita con el id ${id} no fue encontrada`)
    else return appointmentFound
}

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDTO ): Promise<AppointmentRegisterDTO> => {
    const userFound = await getUserByIdService(appointmentData.userId)
    if(!userFound) throw new Error(`El usuario con id: ${appointmentData.userId} no existe`)
    const newAppointment: Appointment = {
        id: id++,
        date: new Date(appointmentData.date),
        time: appointmentData.time,
        status: Status.active,
        userId: appointmentData.userId
    }
    appointmentList.push(newAppointment)
    return newAppointment
}

export const cancelStatusAppointmentService = async(id: string): Promise<Appointment> => {
    const appointmentFound = appointmentList.find(appointment => appointment.id === parseInt(id, 10))
    if(!appointmentFound) throw new Error(`La cita con el id ${id} no fue encontrada`)
    appointmentFound.status = Status.cancelled
    return appointmentFound
}



