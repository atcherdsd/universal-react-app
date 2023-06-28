import React from 'react';
import { Links } from '../types/types';
import Link from 'next/link';

export const makeListItems = (links: Links, elem: string, index: number): JSX.Element => {
  const item = Object.values(links)[index];
  return (
    <li key={item} className="Header-link-item">
      <div className="Header-link">
        <Link href={item}>{elem}</Link>
      </div>
    </li>
  );
};
