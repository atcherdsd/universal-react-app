import React from 'react';
import logo from './logo-phone.svg';
import './Header.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import About from './About';
import Main from './Main';
import Error from './Error';
import about from './data/about.json';

const [aboutData1, aboutData2] = about.aboutData;

function Header(props: { sitename: string; links: object }) {
  const links = props.links;

  return (
    <Router>
      <header className="Header-container">
        <div className="Header-logo__container">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Headear-title">{props.sitename}</h1>
        </div>
        <div className="Header-right">
          <nav className="Header-menu">
            <ul className="Header-links">
              {Object.keys(links).map((elem, index) => {
                const item: string = Object.values(links)[index];
                return item === '/' ? (
                  <li key={item}>
                    <NavLink className="Header-link" end to={item}>
                      {elem}
                    </NavLink>
                  </li>
                ) : (
                  <li key={item}>
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
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/about"
          element={<About p1={aboutData1.description} p2={aboutData2.description} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default Header;
