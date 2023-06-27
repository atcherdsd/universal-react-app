import React from 'react';
import '../styles/NotFound.css';

function NotFound(): JSX.Element {
  return (
    <>
      <h1 className="NotFound-title">404</h1>
      <p className="NotFound-message">OOPS! Requested page not found</p>
    </>
  );
}

export default NotFound;
