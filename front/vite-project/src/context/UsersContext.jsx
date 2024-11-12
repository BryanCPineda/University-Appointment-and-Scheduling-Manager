/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useMemo, useState } from "react";

export const UsersContext = createContext({ 
    user: "",
    userAppointments: [],
    loginUser: async () => {},
    registerUser: async () => {},
    logOutUser: () => {},
    getUserAppointments: async () => {},
    cancelAppointment: async () => {},
    createdAppointment: async () => {}
})

export const UsersProvider = ({ children  }) => {

    const [user, setUser] = useState(localStorage.getItem("userId") || "")
    const [userAppointments, setUserAppointments] = useState([])

    const loginUser = async (userData) => {
          const respuesta = await axios.post("http://localhost:3002/users/login", userData)
          localStorage.setItem("userId", respuesta.data.user.id)
          setUser(respuesta.data.user.id)
    }

    const registerUser = async(userData) => {
          await axios.post("http://localhost:3002/users/register", userData)
    }

    const logOutUser = () => {
          localStorage.clear()
          setUser("")
          setUserAppointments([])
    }

    const getUserAppointments = async (userId) => {
          const response = await axios.get(`http://localhost:3002/users/${userId}`)
          setUserAppointments(response.data.appointments)
    }

    const cancelAppointment = async (appointmentId) => {
          await axios.put(`http://localhost:3002/appointments/cancel/${appointmentId}`)
          const userAppintmentsUpdate = userAppointments.map( appointment => {
              if(appointment.id === appointmentId){
                  const appointmentUpdate = {...appointment, status: "cancelled"}
                  return appointmentUpdate
              } else return appointment
          })
          setUserAppointments(userAppintmentsUpdate)
    }

    const createdAppointment = async (values) => {
          const apponitmentValues = {
              ...values,
              userId: user
          }
          await axios.post(`http://localhost:3002/appointments/schedule`, apponitmentValues)
    }
    

    const value = useMemo(() => ({
      user,
      userAppointments,
      loginUser,
      registerUser,
      logOutUser,
      getUserAppointments,
      cancelAppointment,
      createdAppointment
    }), [user, userAppointments])


    
    return (
        <UsersContext.Provider value={value} >
            { children }
        </UsersContext.Provider>
    )
}

