import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/store';

export type Links = {
  main: string;
  'about us': string;
};

export type Country = {
  name: string;
  code: string;
};

export type Data = {
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
};

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
