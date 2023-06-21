import React from 'react';
import logo from '../.././logo.svg';
import './Header.scss';
import { IHeaderProps } from 'types/interfaces';
import { makeListItems } from 'components/utilities/utils';

function Header(props: IHeaderProps): JSX.Element {
  const links = props.links;
  const listItems = Object.keys(links).map((elem: string, index: number): JSX.Element => {
    return makeListItems(links, elem, index);
  });

  return (
    <header className="Header-container">
      <div className="Header-logo__container">
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Headear-title">{props.sitename}</h1>
      </div>
      <div className="Header-right">
        <nav className="Header-menu">
          <ul className="Header-links">{listItems}</ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
