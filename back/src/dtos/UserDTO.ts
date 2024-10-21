export interface UserRegisterDTO {
  name: string,
  nDni: number,
  email: string,
  username: string,
  password: string,
  birthdate: Date
}

export interface UserLoginDTO{
  email: string,
  password: string,
}

export interface UserDTO{
  id: number
  name: string
  email: string
}