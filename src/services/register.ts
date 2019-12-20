import request from '../utils/request';
import {getCodeURL, registerURL, loginURL} from '../utils/url';

export async function fetchCode(data: api.IGetCodeAPI) {
  return await request.get(getCodeURL, data);
}

export async function fetchRegister(data: api.IRegisterAPI) {
  return await request.post(registerURL, data);
}

export async function fetchLogin(data:loginAPI){
  return await request.post(loginURL,data)
}
