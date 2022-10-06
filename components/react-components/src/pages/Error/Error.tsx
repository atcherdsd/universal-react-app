import React from 'react';
import './Error.css';

function NotFound(): JSX.Element {
  return (
    <>
      <h1 className="Error-title">404</h1>
      <p className="Error-message">OOPS! Requested page not found</p>
    </>
  );
}

export default Error;
