import { FormData } from 'components/types/types';
import React, { createContext, ReactNode, Dispatch, useReducer } from 'react';
import { ApiActions, apiReducer, ApiState, FormActions, formReducer, FormState } from './reducers';

type InitialStateType = {
  apiStateData: ApiState;
  formStateData: FormState;
};

type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<ApiActions | FormActions>;
};

const initialState = {
  apiStateData: {
    searchValueApi: '',
    apiData: { articles: [] },
  } as ApiState,

  formStateData: {
    formDataGroup: [] as FormData[],
    formData: {
      key: '',
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      file: '',
      promotions: '',
      personalData: '',
      bonusProgram: '',
      country: 'country',
      zipCode: '',
      deliveryDate: '',
    },
    isDisabledButton: true,
  } as FormState,
};
const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (
  { apiStateData, formStateData }: InitialStateType,
  action: ApiActions | FormActions
) => ({
  apiStateData: apiReducer(apiStateData, action as ApiActions),
  formStateData: formReducer(formStateData, action as FormActions),
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
