import { useReducer } from '@tarojs/taro';

type IState = {
  username: string;
  password: string;
};

type IAction = {
  type: 'handlerUsername' | 'handlerPassword';
  payload: string;
};

const initialState: IState = {
  username: '',
  password: ''
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'handlerUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'handlerPassword':
      return {
        ...state,
        password: action.payload
      };
  }
}

export function useLoginState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
}
