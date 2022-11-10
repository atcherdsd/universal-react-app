import { NavLink } from 'react-router-dom';
import { links } from 'App/App';
import { Data, Links } from 'types/types';
import React from 'react';
import {
  StatusCode,
  ErrorMessage,
  SortByType,
  FilterByCountry,
  FilterByLanguage,
} from 'types/enums';
import { IContentItem } from 'types/interfaces';
import { getNewsData } from 'store/apiSlice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

export const BASIC_URL = 'https://gnews.io/api/v4/search';
export const KEY = 'b1a198162ce907ddfd42b009b63ab35e';

export const makeListItems = (object: Links, elem: string, index: number): JSX.Element => {
  const item: string = Object.values(object)[index];
  return (
    <li key={item} className="Header-link-item">
      <NavLink className="Header-link" end={item === links.main} to={item}>
        {elem}
      </NavLink>
    </li>
  );
};

export const decodeHtmlCharCodes = (str: string): string =>
  str
    .replace(/(&#(\d+);)/g, (_match, _capture, charCode: string) => String.fromCharCode(+charCode))
    .replace(/&rsquo;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™');

export const fetchData = async (
  searchValueApi: string,
  dispatch: Dispatch<AnyAction>,
  setError: (value: React.SetStateAction<string>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  apiData: {
    articles: Data[];
    sortBy: SortByType;
    filterByCountry: FilterByCountry;
    filterByLanguage: FilterByLanguage;
  }
): Promise<void> => {
  try {
    const querySortParameters = `&sortby=${apiData.sortBy}&lang=${apiData.filterByLanguage}&country=${apiData.filterByCountry}`;
    const response = await fetch(
      `${BASIC_URL}?token=${KEY}&q=${searchValueApi}${querySortParameters}`
    );
    switch (response.status.toString()) {
      case StatusCode.BadRequest:
        throw new Error(ErrorMessage.BadRequest);
      case StatusCode.Unauthorized:
        throw new Error(ErrorMessage.Unauthorized);
      case StatusCode.Forbidden:
        throw new Error(ErrorMessage.Forbidden);
      case StatusCode.TooManyRequests:
        throw new Error(ErrorMessage.TooManyRequests);
      case StatusCode.InternalServerError:
        throw new Error(ErrorMessage.InternalServerError);
    }
    if (!response.ok) throw Error(ErrorMessage.AnotherError);
    const data: IContentItem = await response.json();
    dispatch(getNewsData(data.articles));
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setIsLoading(false);
  }
};
