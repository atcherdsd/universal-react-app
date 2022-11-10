import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterByCountry, FilterByLanguage, NewsCount, PageNumber, SortByType } from 'types/enums';
import { Data } from 'types/types';

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
    getNewsData(state, action: PayloadAction<Data[]>) {
      state.apiData.articles = action.payload;
    },
    setNewsCount(state, action: PayloadAction<string>) {
      state.newsCount = action.payload;
    },
    setPageNumber(state, action: PayloadAction<string>) {
      state.pageNumber = action.payload;
    },
  },
});

export const { searchNews, setNewsData, getNewsData, setNewsCount, setPageNumber } =
  apiSlice.actions;

export default apiSlice.reducer;
