export const registerFormValidate = ( input) => {

  const errors = {}

  if(!input.name.trim()) errors.name = "Name is required"
  else if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) errors.name = "Name must be a valid name"

  if(!input.email.trim()) errors.email = "Mail is required"
  else if(!/^\S+@\S+\.\S+$/.test(input.email)) errors.email = "Mail must be a valid email address"

  if(!input.birthdate) errors.birthdate = "birthdate is required"
  else {
    const today = new Date();
    const birthdate = new Date(input.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.birthdate = "User must be at least 18 years old";
    }
  }
  
  if(!input.nDni.trim()) errors.nDni = "DNI number is required"
  else if(!/^\d+$/.test(input.nDni)) errors.nDni = "DNI number must contain only numbers"

  
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