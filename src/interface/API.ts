interface getCodeAPI {
  phone: string
}

interface registerAPI {
  phone: string,
  code: string,
  password: string,
  name: string
}

interface loginAPI {
  username: string,
  password: string
}

export {
  getCodeAPI,
  registerAPI,
  loginAPI
}
