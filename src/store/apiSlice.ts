import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterByCountry,
  FilterByLanguage,
  NewsCount,
  PageNumber,
  SortByType,
} from 'components/types/enums';
import { Data } from 'components/types/types';
import { Types } from './types';

export type ApiState = {
  searchValueApi: string;
  apiData: {
    articles: Data[];
    sortBy: SortByType;
    filterByCountry: FilterByCountry;
    filterByLanguage: FilterByLanguage;
  };
  newsCount: string;
  pageNumber: string;
};

export type ApiActions =
  | { type: Types.SearchNews; payload: string }
  | {
      type: Types.SetNewsData;
      payload: {
        articles: Data[];
        sortBy: SortByType;
        filterByCountry: FilterByCountry;
        filterByLanguage: FilterByLanguage;
      };
    }
  | { type: Types.SetNewsCount; payload: string }
  | { type: Types.SetPageNumber; payload: string };

const initialState: ApiState = {
  searchValueApi: '',
  apiData: {
    articles: [],
    sortBy: SortByType.date,
    filterByCountry: FilterByCountry.Australia,
    filterByLanguage: FilterByLanguage.English,
  },
  newsCount: NewsCount.Ten,
  pageNumber: PageNumber.One,
};

// export const apiReducer = (state: ApiState = initialState, action: ApiActions) => {
//   switch (action.type) {
//     case Types.SearchNews:
//       return {
//         ...state,
//         searchValueApi: action.payload,
//       };
//     case Types.SetNewsData:
//       return {
//         ...state,
//         apiData: action.payload,
//       };
//     case Types.SetNewsCount:
//       return {
//         ...state,
//         newsCount: action.payload,
//       };
//     case Types.SetPageNumber:
//       return {
//         ...state,
//         pageNumber: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    searchNews(state, action: PayloadAction<string>) {
      state.searchValueApi = action.payload;
    },
    setNewsData(state, action: PayloadAction<ApiState['apiData']>) {
      state.apiData = { ...action.payload };
    },
    setNewsCount(state, action: PayloadAction<string>) {
      state.newsCount = action.payload;
    },
    setPageNumber(state, action: PayloadAction<string>) {
      state.pageNumber = action.payload;
    },
  },
});

export const { searchNews, setNewsData, setNewsCount, setPageNumber } = apiSlice.actions;

export default apiSlice.reducer;
