interface RegisterProp {}

interface RegisterState {
  username: string,
  password: string
  phoneNumber: string,
  auth: number,
  firstPassword: string,
  secondPassword: string,
  step: number,
  code: string
}

export { RegisterProp, RegisterState };
