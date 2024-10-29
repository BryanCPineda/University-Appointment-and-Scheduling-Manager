import { formValidates } from "../../helpers/formValidates"
import styles from "./App.module.css"
import { useFormik } from "formik"

const App = () => {

  const formik = useFormik({
      initialValues: {
        username: "",
        password: ""
      },
      validate: formValidates,
      onSubmit: (values) => {
            console.log("Formulario enviado:", values)
      },
      initialErrors:{
        username: "Username is required",
        password: "Password is required"
      }
  })

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formTitle}> Formulario </h2>
        <div className={styles.formGroup}>
            <label className={styles.formLabel}> Username: </label>
            <input 
              className={styles.formInput}
              type="text"
              name="username"
              placeholder="mail@mail.com"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label className={styles.errorLabel}> 
              { formik.errors.username }
            </label>
        </div>
        <div className={styles.formGroup}>
            <label className={styles.formLabel}> Password: </label>
            <input 
            className={styles.formInput}
              type="password"
              name="password"
              placeholder="⚫⚫⚫⚫⚫"
              onChange={formik.handleChange}  
              value={formik.values.password}

            />
            <label className={styles.errorLabel}> 
              { formik.errors.password }
            </label>
        </div>

        <button 
          type="submit" 
          className={styles.formButton}
          disabled={ 
              Object.keys(formik.errors).length > 0 ||
              formik.errors.username || formik.errors.password
          }
        >
          Submit
        </button>
    </form>
  )

}

export default App