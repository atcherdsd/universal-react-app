import React from 'react';
import { Links } from '../types/types';
import Link from 'next/link';

export const makeListItems = (
  links: Links,
  elem: string,
  index: number,
  pathname: string
): JSX.Element => {
  const item = Object.values(links)[index];
  return (
    <li key={item} className="Header-link-item">
      <Link href={item}>
        <a className={pathname === item ? 'Header-link active' : 'Header-link'}>{elem}</a>
      </Link>
    </li>
  );
};
