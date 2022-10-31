import { NavLink } from 'react-router-dom';
import { links } from 'App/App';
import { Links } from 'components/types/types';
import React from 'react';

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
