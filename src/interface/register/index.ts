interface RegisterProp {}

interface RegisterState {
  username: string;
  password: string;
  phonenumber: string;
  auth: number;
  firstpassword: string;
  secondpassword: string;
}

export { RegisterProp, RegisterState };
