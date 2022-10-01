import React from 'react';
import logo from './logo-phone.svg';
import './Header.css';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import About from './About';
import Main from './Main';
import Error from './Error';

function Header() {
  return (
    <Router>
      <header className="Header-container">
        <div className="Header-logo__container">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Headear-title">smartphone universe</h1>
        </div>
        <div className="Header-right">
          <nav className="Header-menu">
            <ul className="Header-links">
              <li>
                <NavLink className="Header-link" end to="/">
                  Main
                </NavLink>
              </li>
              <li>
                <NavLink className="Header-link" to="/about">
                  About Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default Header;
