import Taro, { createContext, useState } from '@tarojs/taro';

export const UserContext = createContext<string>('');

export function UserProvider(props) {
  const [user, setUser] = useState('');

  setUser(Taro.getStorageSync('token'));

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}
