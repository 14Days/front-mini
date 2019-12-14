declare module api {
  export interface IGetCodeAPI {
    phone: string;
  }

  export interface IRegisterAPI {
    phone: string;
    code: string;
    password: string;
    name: string;
  }

  export interface ILoginAPI {
    username: string;
    password: string;
  }
}
