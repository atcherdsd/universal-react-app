import React from 'react';
import Image from 'next/image';
import logo from '../public/logo-phone.svg';
import { IHeaderProps } from '../types/interfaces';
import { makeListItems } from '../utilities/utils';

const Header = ({ storeName, links }: IHeaderProps): JSX.Element => {
  const listItems = Object.keys(links).map((elem: string, index: number): JSX.Element => {
    return makeListItems(links, elem, index);
  });

  return (
    <header className="Header-container">
      <div className="Header-logo__container">
        <Image src={logo} className="Header-logo" alt="logo" />
        <h1 className="Headear-title">{storeName}</h1>
      </div>
      <div className="Header-right">
        <nav className="Header-menu">
          <ul className="Header-links">{listItems}</ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
