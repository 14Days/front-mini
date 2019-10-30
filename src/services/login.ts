import request from '../utils/request';
import { loginURL } from '../utils/url';

export async function fetchLogin(username: string, password: string) {
  return await request.post(loginURL, {
    name: username,
    password: password
  });
}
