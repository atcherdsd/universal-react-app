import React, { createContext, ReactNode, Dispatch, useReducer, useState } from 'react';
import { ApiActions, apiReducer, ApiState } from './reducers';

type InitialStateType = { apiStateData: ApiState };

type ContextType = {
  state: InitialStateType;
  searchValueApi: string;
  setSearchValueApi: (v: string) => void;
  dispatch: Dispatch<ApiActions>;
};

const initialState = {
  apiStateData: {
    searchValueApi: '', // change to LS
    apiData: { articles: [] },
  } as ApiState,
};
const ApiContext = createContext<ContextType>({
  state: initialState,
  searchValueApi: '',
  setSearchValueApi: () => {},
  dispatch: () => null,
});

const reducer = ({ apiStateData }: InitialStateType, action: ApiActions) => ({
  apiStateData: apiReducer(apiStateData, action),
});

const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [searchValueApi, setSearchValueApi] = useState(
    localStorage.getItem('searchValueApi') || ''
  );

  return (
    <ApiContext.Provider value={{ state, searchValueApi, setSearchValueApi, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
