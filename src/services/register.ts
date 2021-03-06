import {getCodeURL, registerURL, loginURL} from "../utils/url";
import {getCodeAPI, registerAPI, loginAPI} from "../interface/API";
import request from '../utils/request';

export async function fetchCode(data:getCodeAPI){
  return await request.get(getCodeURL,data)
}

export async function fetchRegister(data:registerAPI){
  return await request.post(registerURL,data)
}

export async function fetchLogin(data:loginAPI){
  return await request.post(loginURL,data)
}
