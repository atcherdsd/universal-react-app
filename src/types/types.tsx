import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/store';

export type Links = {
  main: string;
  'about us': string;
};

export type Positions = {
  title: string;
  review: string;
  rating: string;
  price: string;
  stock: string;
  delivery: string;
  logo: string;
  img: string;
  description: {
    info: string[];
  };
};

export type FormData = {
  key: string;
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  file: string;
  promotions: string;
  personalData: string;
  bonusProgram: string;
  country: string;
  zipCode: string;
  deliveryDate: string;
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

export type HandleResult = { (): void };

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
