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

// export const fetchAPIData = createAsyncThunk(
//   'api/fetchdata',
//   async (apiData: {
//     articles: Data[];
//     sortBy: SortByType;
//     filterByCountry: FilterByCountry;
//     filterByLanguage: FilterByLanguage;
//   }) => {
//     const BASIC_URL = 'https://gnews.io/api/v4/search';
//     const KEY = 'b1a198162ce907ddfd42b009b63ab35e';
//     const querySortParameters = `&sortby=${apiData.sortBy}&lang=${apiData.filterByLanguage}&country=${apiData.filterByCountry}`;
//     const response = await fetch(
//       `${BASIC_URL}?token=${KEY}&q=${searchValueApi}${querySortParameters}`
//     );
//     return await response.json();
//   }
// );

// export const BASIC_URL = 'https://gnews.io/api/v4/search';
// export const KEY = 'b1a198162ce907ddfd42b009b63ab35e';

// export const fetchApiThunkCreator = (
//   searchValueApi: string,
//   setError: (value: React.SetStateAction<string>) => void,
//   setIsLoading: (value: React.SetStateAction<boolean>) => void,
//   apiData: {
//     articles: Data[];
//     sortBy: SortByType;
//     filterByCountry: FilterByCountry;
//     filterByLanguage: FilterByLanguage;
//   }
// ) => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     const querySortParameters = `&sortby=${apiData.sortBy}&lang=${apiData.filterByLanguage}&country=${apiData.filterByCountry}`;
//     try {
//       const response = await fetch(
//         `${BASIC_URL}?token=${KEY}&q=${searchValueApi}${querySortParameters}`
//       );
//       switch (response.status.toString()) {
//         case StatusCode.BadRequest:
//           throw new Error(ErrorMessage.BadRequest);
//         case StatusCode.Unauthorized:
//           throw new Error(ErrorMessage.Unauthorized);
//         case StatusCode.Forbidden:
//           throw new Error(ErrorMessage.Forbidden);
//         case StatusCode.TooManyRequests:
//           throw new Error(ErrorMessage.TooManyRequests);
//         case StatusCode.InternalServerError:
//           throw new Error(ErrorMessage.InternalServerError);
//       }
//       if (!response.ok) throw Error(ErrorMessage.AnotherError);
//       const data: IContentItem = await response.json();
//       dispatch(getNewsData(data.articles));
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
// };

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
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(fetchAPIData.fulfilled, (state, action) => {
  //     // Add user to the state array
  //     state.apiData.articles.push(action.payload);
  //   });
  // },
});

export const { searchNews, setNewsData, getNewsData, setNewsCount, setPageNumber } =
  apiSlice.actions;

export default apiSlice.reducer;
