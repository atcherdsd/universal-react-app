import { BrowserRouter, NavLink } from 'react-router-dom';
import React from 'react';
import { Links } from '../types/types';

export const makeListItems = (links: Links, elem: string, index: number): JSX.Element => {
  const item: string = Object.values(links)[index];
  return (
    <BrowserRouter>
      <li key={item} className="Header-link-item">
        <NavLink className="Header-link" end={item === links.main} to={item}>
          {elem}
        </NavLink>
      </li>
    </BrowserRouter>
  );
};
