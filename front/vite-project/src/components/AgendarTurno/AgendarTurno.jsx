import { useFormik } from "formik"
import Styles from "./AgendarTurno.module.css"
import { dateFormValidates } from "../../helpers/dateFormValidates"
import Swal from "sweetalert2"
import { UsersContext } from "../../context/UsersContext"
import { useContext } from "react"

const AgendarTurno = () => {

  const  { createdAppointment } = useContext(UsersContext)

  const formik = useFormik({
      initialValues: {
          date: "",
          time: ""
      },
      validate: dateFormValidates,
      initialErrors: {
          date: "La fecha es requerida",
          time: "La hora es requerida"
      },
      onSubmit: async (values) => {
          try {
            await createdAppointment(values)
            Swal.fire({
              icon: "success",
              title: "Turno agendado exitosamente"
            })
          } catch (error) {
              Swal.fire({
                  icon:"error",
                  title: `${error.response.data.details}`,
                  text: "Intentelo nuevamente"
              })
          }  finally {
              formik.resetForm()
          }
      }
  })


  return (
    <div className={Styles.container}>
      <h1  className={Styles.title}> Agendar Turno</h1>
      <form className={Styles.form}  onSubmit={formik.handleSubmit}> 
          <div className={Styles.formGroup}> 
            <label> Fecha </label>
            <input 
              id="date"
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={formik.handleChange}
              value={formik.values.date}
              className={
                  formik.touched.date && formik.errors.date ? Styles.errorInput : Styles.input
              }
            />
            { 
              formik.errors.date ? ( 
                <>
                  <div className={Styles.error}> { formik.errors.date }</div>
                </>
              ) : null
            }

          </div>

          <div className={Styles.formGroup}>
            <label htmlFor="time">Hora</label>
            <input
              id="time"
              name="time"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time}
              className={
                formik.touched.time && formik.errors.time
                  ? Styles.errorInput
                  : Styles.input
              }
            />
            {formik.errors.time ? (
              <div className={Styles.error}>{formik.errors.time}</div>
            ) : null}
        </div>

        <button
          type="submit"
          className={Styles.submitButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Agendar
        </button>

      </form>
    </div>
  )




}


export default AgendarTurno