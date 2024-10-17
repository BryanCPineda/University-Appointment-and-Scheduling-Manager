export interface UserRegisterDTO {
  name: string,
  DNI: number,
  email: string,
  password: string,
}

export interface UserLoginDTO{
  email: string,
  password: string,
}
