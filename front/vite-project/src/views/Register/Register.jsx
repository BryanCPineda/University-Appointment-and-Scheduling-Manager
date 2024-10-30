import { registerFormValidate } from "../../helpers/registerFormValidate"
import styles from "./Register.module.css"
import { useFormik } from "formik"
import axios from "axios"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

const Register = () => {

  const formik = useFormik({
      initialValues: {
          name: "",
          email: "",
          birthdate: "",
          nDni: "",
          username: "",
          password: ""
      },
      initialErrors:{
          name: "name is required",
          email: "email is required",
          birthdate: "birthdate is required",
          nDni: "DNI is required",
          username: "username is required",
          password: "password is required"
      },
      validate: registerFormValidate,
      onSubmit: (values) => {
          axios.post("http://localhost:3002/users/register", values)
            .then((res) => {
                  if(res.status === 201){
                      Swal.fire({
                          icon: "success",
                          title: "Usuario registrado correctamente"
                      })
                  }
            })
            .catch((err) =>{
                if(err.response.data.details.includes("email")){
                    Swal.fire({
                      icon: "error",
                      title: `Ya existe un usuario con el mail: ${formik.values.email}`,
                      text: "intente con otro email"
                    })
                }
                else if(err.response.data.details.includes("username")){
                  Swal.fire({
                    icon: "error",
                    title: `Ya existe un usuario: ${formik.values.username}`,
                    text: "intente con otro username"
                  })
                }
                else if(err.response.data.details.includes("nDni")){
                  Swal.fire({
                    icon: "error",
                    title: `Ya existe un usuario con el numero de DNI: ${formik.values.nDni}`,
                  })
                }
            })
      }
  })

  return (
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}> 
          <h2 className={styles.formTitle}> Formulario de registro </h2>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nombre:</label>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              placeholder="Tu nombre"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ?? formik.errors.name ? (
              <label className={styles.errorLabel}>{formik.errors.name}</label>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email:</label>
            <input
              className={styles.formInput}
              type="text"
              name="email"
              placeholder="mail@mail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.errors.email ? (
              <label className={styles.errorLabel}>{formik.errors.email}</label>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Fecha de nacimiento:</label>
            <input
              className={styles.formInput}
              type="date"
              name="birthdate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthdate}
            />
            {formik.errors.birthdate && formik.errors.birthdate ? (
              <label className={styles.errorLabel}>{formik.errors.birthdate}</label>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>nDni:</label>
            <input
              className={styles.formInput}
              type="text"
              name="nDni"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nDni}
            />
            {formik.errors.nDni && formik.errors.nDni ? (
              <label className={styles.errorLabel}>{formik.errors.nDni}</label>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username:</label>
            <input
              className={styles.formInput}
              type="text"
              name="username"
              placeholder="Tu nombre de usuario"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.errors.username && formik.errors.username ? (
              <label className={styles.errorLabel}>{formik.errors.username}</label>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password:</label>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              placeholder="⚫⚫⚫⚫⚫"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.errors.password ? (
              <label className={styles.errorLabel}>{formik.errors.password}</label>
            ) : null}
          </div>
          

          <button
            className={styles.formButton}
            type="submit"
            disabled={
              Object.keys(formik.errors).length > 0 ||
              !formik.values.name ||
              !formik.values.email ||
              !formik.values.birthdate ||
              !formik.values.nDni ||
              !formik.values.username ||
              !formik.values.password
            } 
            >
            Submit
          </button>
          <br />
          <label>
              Ya tienes una cuenta ? <Link to="/login">  Login </Link> 
          </label>
      </form>
  )
}


export default Register