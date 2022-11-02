import { Data, FormData } from 'components/types/types';

export enum Types {
  SearchNews = 'SEARCH_NEWS',
  SetNewsData = 'SET_NEWS_DATA',
  AddFormCard = 'ADD_FORM_CARD',
  ChangeForm = 'CHANGE_FORM',
  DisableSubmit = 'DISABLE_SUBMIT_BUTTON',
  EnableSubmit = 'ENABLE_SUBMIT_BUTTON',
}

// API Section

export type ApiState = {
  searchValueApi: string;
  apiData: {
    articles: Data[];
  };
};

export type ApiActions =
  | { type: Types.SearchNews; payload: string }
  | {
      type: Types.SetNewsData;
      payload: {
        articles: Data[];
      };
    };

export const apiReducer = (state: ApiState, action: ApiActions) => {
  switch (action.type) {
    case Types.SearchNews:
      return {
        ...state,
        searchValueApi: action.payload,
      };
    case Types.SetNewsData:
      return {
        ...state,
        apiData: action.payload,
      };
    default:
      return state;
  }
};

// Form Section

export type FormState = {
  formDataGroup: FormData[];
  formData: FormData;
  isDisabledButton: boolean;
};

export type FormActions =
  | { type: Types.AddFormCard; payload: FormData }
  | { type: Types.ChangeForm; payload: FormData }
  | { type: Types.DisableSubmit }
  | { type: Types.EnableSubmit };

export const formReducer = (state: FormState, action: FormActions) => {
  switch (action.type) {
    case Types.AddFormCard:
      return {
        ...state,
        formDataGroup: [...state.formDataGroup, action.payload],
      };
    case Types.ChangeForm:
      return {
        ...state,
        formData: action.payload,
      };
    case Types.DisableSubmit:
      return {
        ...state,
        isDisabledButton: true,
      };
    case Types.EnableSubmit:
      return {
        ...state,
        isDisabledButton: false,
      };
    default:
      return state;
  }
};
