import React from 'react';
import logo from '../.././logo-phone.svg';
import './Header.css';
import { NavLink } from 'react-router-dom';

interface IHeaderProps {
  sitename: string;
  links: object;
}

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
              const item: string = Object.values(links)[index];
              return item === '/' ? (
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
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
