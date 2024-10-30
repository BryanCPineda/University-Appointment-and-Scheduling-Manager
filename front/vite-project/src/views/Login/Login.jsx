/* eslint-disable react/prop-types */
import { loginFormValidate } from "../../helpers/loginFormValidate"
import styles from "./Login.module.css"
import { useFormik } from "formik"
import axios from "axios"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"

const Login = ({setIsLogged}) => {
  const navigate = useNavigate()
  const formik = useFormik({
      initialValues: {
        username: "",
        password: ""
      },
      validate: loginFormValidate,
      initialErrors:{
        username: "Username is required",
        password: "Password is required"
      },
      onSubmit: (values) => {
          axios.post("http://localhost:3002/users/login", values)
            .then((res) => {
                  if(res.status === 200){
                      Swal.fire({
                        icon: "success",
                        title: "Usuario logueado con exito"
                      })
                  }
                  localStorage.setItem("loggin", true)
                  setIsLogged(true)
                  navigate("/")
            })
            .catch((err) => {
                if(err){
                    Swal.fire({
                      icon:"error",
                      title: "Usuario o contraseña invalidos",
                      text: "intente nuevamente"
                    })
                }
            })
      }
  })

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Formulario De Login </h2>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Username:</label>
        <input
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Tu nombre de usuario"
          onChange={formik.handleChange}
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
          !formik.values.username ||
          !formik.values.password
        }
      >
        Submit
      </button>
      <br />
      <label>
          Aun no tienes una cuenta ? <Link to="/register">  Registrate </Link> 
      </label>
    </form>
  )
}


export default Login