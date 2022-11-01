import { Data } from 'components/types/types';

export enum Types {
  SearchNews = 'SEARCH_NEWS',
  SetNewsData = 'SET_NEWS_DATA',
}

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
