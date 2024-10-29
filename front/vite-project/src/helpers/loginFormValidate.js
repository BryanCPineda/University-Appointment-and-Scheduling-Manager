export const loginFormValidate = ( input) => {

  const errors = {}

  if(!input.username.trim()) errors.username = "username is required"
  else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors

}