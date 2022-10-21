import React from 'react';
import logo from '../.././logo-phone.svg';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { Links, links } from 'App/App';

interface IHeaderProps {
  sitename: string;
  links: Links;
}

const makeListItems = (object: Links, elem: string, index: number): JSX.Element => {
  const item: string = Object.values(object)[index];
  return item === links.main ? (
    <li key={item} className="Header-link-item">
      <NavLink className="Header-link" end to={item}>
        {elem}
      </NavLink>
    </li>
  ) : (
    <li key={item} className="Header-link-item">
      <NavLink className="Header-link" to={item}>
        {elem}
      </NavLink>
    </li>
  );
};

function Header(props: IHeaderProps): JSX.Element {
  const links = props.links;

  return (
    <header className="Header-container">
      <div className="Header-logo__container">
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Headear-title">{props.sitename}</h1>
      </div>
      <div className="Header-right">
        <nav className="Header-menu">
          <ul className="Header-links">
            {Object.keys(links).map((elem: string, index: number): JSX.Element => {
              return makeListItems(links, elem, index);
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
